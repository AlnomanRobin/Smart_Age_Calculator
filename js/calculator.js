/**
 * ChronoAge — Calculator Module
 * High-precision calendar arithmetic, leap year handling, unit breakdowns,
 * and astrological/chronological metadata.
 */

const AgeCalculator = (() => {
  const WEEKDAYS = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const ZODIAC_SIGNS = [
    { sign: 'Capricorn', symbol: '♑', element: 'Earth', planet: 'Saturn', start: [12, 22], end: [1, 19], trait: 'Ambitious, disciplined, and patient' },
    { sign: 'Aquarius', symbol: '♒', element: 'Air', planet: 'Uranus', start: [1, 20], end: [2, 18], trait: 'Visionary, original, and humanitarian' },
    { sign: 'Pisces', symbol: '♓', element: 'Water', planet: 'Neptune', start: [2, 19], end: [3, 20], trait: 'Intuitive, artistic, and compassionate' },
    { sign: 'Aries', symbol: '♈', element: 'Fire', planet: 'Mars', start: [3, 21], end: [4, 19], trait: 'Courageous, energetic, and pioneering' },
    { sign: 'Taurus', symbol: '♉', element: 'Earth', planet: 'Venus', start: [4, 20], end: [5, 20], trait: 'Grounded, dependable, and creative' },
    { sign: 'Gemini', symbol: '♊', element: 'Air', planet: 'Mercury', start: [5, 21], end: [6, 20], trait: 'Adaptable, intellectual, and communicative' },
    { sign: 'Cancer', symbol: '♋', element: 'Water', planet: 'Moon', start: [6, 21], end: [7, 22], trait: 'Nurturing, intuitive, and protective' },
    { sign: 'Leo', symbol: '♌', element: 'Fire', planet: 'Sun', start: [7, 23], end: [8, 22], trait: 'Charismatic, generous, and confident' },
    { sign: 'Virgo', symbol: '♍', element: 'Earth', planet: 'Mercury', start: [8, 23], end: [9, 22], trait: 'Analytical, meticulous, and practical' },
    { sign: 'Libra', symbol: '♎', element: 'Air', planet: 'Venus', start: [9, 23], end: [10, 22], trait: 'Diplomatic, charming, and harmonious' },
    { sign: 'Scorpio', symbol: '♏', element: 'Water', planet: 'Pluto', start: [10, 23], end: [11, 21], trait: 'Passionate, magnetic, and perceptive' },
    { sign: 'Sagittarius', symbol: '♐', element: 'Fire', planet: 'Jupiter', start: [11, 22], end: [12, 21], trait: 'Philosophical, adventurous, and optimistic' }
  ];

  const CHINESE_ZODIAC = [
    { animal: 'Rat', element: 'Water', trait: 'Clever, resourceful, and versatile' },
    { animal: 'Ox', element: 'Earth', trait: 'Steadfast, trustworthy, and hardworking' },
    { animal: 'Tiger', element: 'Wood', trait: 'Brave, competitive, and confident' },
    { animal: 'Rabbit', element: 'Wood', trait: 'Gentle, elegant, and peaceful' },
    { animal: 'Dragon', element: 'Earth', trait: 'Charismatic, powerful, and lucky' },
    { animal: 'Snake', element: 'Fire', trait: 'Wise, enigmatic, and intuitive' },
    { animal: 'Horse', element: 'Fire', trait: 'Spirited, energetic, and free' },
    { animal: 'Goat', element: 'Earth', trait: 'Gentle, sympathetic, and artistic' },
    { animal: 'Monkey', element: 'Metal', trait: 'Witty, inquisitive, and inventive' },
    { animal: 'Rooster', element: 'Metal', trait: 'Observant, hardworking, and punctual' },
    { animal: 'Dog', element: 'Earth', trait: 'Loyal, honest, and protective' },
    { animal: 'Pig', element: 'Water', trait: 'Compassionate, generous, and diligent' }
  ];

  const BIRTH_METADATA = [
    { month: 'January', stone: 'Garnet', flower: 'Carnation', season: 'Winter' },
    { month: 'February', stone: 'Amethyst', flower: 'Violet', season: 'Winter' },
    { month: 'March', stone: 'Aquamarine', flower: 'Daffodil', season: 'Spring' },
    { month: 'April', stone: 'Diamond', flower: 'Daisy', season: 'Spring' },
    { month: 'May', stone: 'Emerald', flower: 'Lily of the Valley', season: 'Spring' },
    { month: 'June', stone: 'Pearl & Alexandrite', flower: 'Rose', season: 'Summer' },
    { month: 'July', stone: 'Ruby', flower: 'Larkspur', season: 'Summer' },
    { month: 'August', stone: 'Peridot', flower: 'Gladiolus', season: 'Summer' },
    { month: 'September', stone: 'Sapphire', flower: 'Aster', season: 'Autumn' },
    { month: 'October', stone: 'Opal & Tourmaline', flower: 'Marigold', season: 'Autumn' },
    { month: 'November', stone: 'Topaz & Citrine', flower: 'Chrysanthemum', season: 'Autumn' },
    { month: 'December', stone: 'Turquoise & Tanzanite', flower: 'Narcissus', season: 'Winter' }
  ];

  /**
   * Returns whether a given year is a leap year.
   */
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  /**
   * Returns number of days in a specific year and month (0-indexed).
   */
  const getDaysInMonth = (year, monthIndex) => {
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  /**
   * Returns safe clamped date in given year and month (handling Feb 29 -> Feb 28 in non-leap years).
   */
  const getClampedDate = (year, monthIndex, day, hours = 0, minutes = 0, seconds = 0) => {
    const maxDays = getDaysInMonth(year, monthIndex);
    const safeDay = Math.min(day, maxDays);
    return new Date(year, monthIndex, safeDay, hours, minutes, seconds, 0);
  };

  /**
   * Calculates exact chronological age (Years, Months, Days).
   * Uses the monotonic anchor progression method to prevent any negative borrow anomalies.
   */
  const calculateExactAge = (birthDate, targetDate = new Date()) => {
    if (!birthDate || isNaN(birthDate.getTime())) {
      return { valid: false, error: 'Invalid birth date provided.' };
    }

    if (targetDate.getTime() < birthDate.getTime()) {
      return { valid: false, error: 'Date of birth cannot be in the future.' };
    }

    const bYear = birthDate.getFullYear();
    const bMonth = birthDate.getMonth();
    const bDay = birthDate.getDate();
    const bHours = birthDate.getHours();
    const bMinutes = birthDate.getMinutes();
    const bSeconds = birthDate.getSeconds();

    const tYear = targetDate.getFullYear();
    const tMonth = targetDate.getMonth();
    const tDay = targetDate.getDate();

    // 1. Advance full years
    let candYears = tYear - bYear;
    let anchorYears = getClampedDate(bYear + candYears, bMonth, bDay, bHours, bMinutes, bSeconds);
    if (anchorYears.getTime() > targetDate.getTime()) {
      candYears -= 1;
      anchorYears = getClampedDate(bYear + candYears, bMonth, bDay, bHours, bMinutes, bSeconds);
    }
    const years = candYears;

    // 2. Advance full months
    let months = 0;
    let currentAnchor = new Date(anchorYears);
    while (months < 12) {
      const nextMonthAbsolute = bMonth + months + 1;
      const nextYear = (bYear + years) + Math.floor(nextMonthAbsolute / 12);
      const nextMonthIndex = nextMonthAbsolute % 12;
      const testDate = getClampedDate(nextYear, nextMonthIndex, bDay, bHours, bMinutes, bSeconds);
      if (testDate.getTime() <= targetDate.getTime()) {
        months += 1;
        currentAnchor = testDate;
      } else {
        break;
      }
    }

    // 3. Remaining days
    // Compare midnight to midnight of currentAnchor and targetDate for clean calendar day count
    const anchorMidnight = new Date(currentAnchor.getFullYear(), currentAnchor.getMonth(), currentAnchor.getDate()).getTime();
    const targetMidnight = new Date(tYear, tMonth, tDay).getTime();
    const diffMs = targetMidnight - anchorMidnight;
    const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

    // Total Units
    const totalMs = targetDate.getTime() - birthDate.getTime();
    const totalSeconds = Math.floor(totalMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDaysInWeek = totalDays % 7;
    const totalMonths = (years * 12) + months;

    return {
      valid: true,
      years,
      months,
      days,
      totalUnits: {
        totalMonths,
        totalWeeks,
        remainingDaysInWeek,
        totalDays,
        totalHours,
        totalMinutes,
        totalSeconds
      },
      birthDate,
      targetDate
    };
  };

  /**
   * Resolves Western Zodiac sign for a given month (0-11) and day (1-31).
   */
  const getZodiacSign = (monthIndex, day) => {
    const month = monthIndex + 1; // 1-12
    for (const z of ZODIAC_SIGNS) {
      const [startM, startD] = z.start;
      const [endM, endD] = z.end;
      if (startM === 12 && endM === 1) {
        if ((month === 12 && day >= startD) || (month === 1 && day <= endD)) {
          return z;
        }
      } else if ((month === startM && day >= startD) || (month === endM && day <= endD)) {
        return z;
      }
    }
    return ZODIAC_SIGNS[0];
  };

  /**
   * Resolves Chinese Zodiac animal for a given birth year.
   */
  const getChineseZodiac = (year) => {
    // 1900 was Year of the Rat (index 0)
    const index = (year - 4) % 12;
    const safeIndex = index < 0 ? index + 12 : index;
    return CHINESE_ZODIAC[safeIndex];
  };

  /**
   * Returns birth metadata (birthstone, flower, season, weekday).
   */
  const getBirthDetails = (birthDate) => {
    const monthIndex = birthDate.getMonth();
    const day = birthDate.getDate();
    const year = birthDate.getFullYear();
    const dayOfWeek = WEEKDAYS[birthDate.getDay()];
    const zodiac = getZodiacSign(monthIndex, day);
    const chineseZodiac = getChineseZodiac(year);
    const meta = BIRTH_METADATA[monthIndex];

    return {
      dayOfWeek,
      monthName: MONTH_NAMES[monthIndex],
      year,
      day,
      zodiac,
      chineseZodiac,
      birthstone: meta.stone,
      birthFlower: meta.flower,
      season: meta.season
    };
  };

  return {
    calculateExactAge,
    getBirthDetails,
    isLeapYear,
    getDaysInMonth,
    WEEKDAYS,
    MONTH_NAMES
  };
})();

