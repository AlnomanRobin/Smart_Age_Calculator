/**
 * ChronoAge — Countdown Module
 * Real-time next birthday calculations, time breakdown, and cycle progression.
 */

const BirthdayCountdown = (() => {
  /**
   * Calculates the next birthday and precise remaining time.
   * @param {Date} birthDate
   * @param {Date} now
   */
  const getNextBirthdayInfo = (birthDate, now = new Date()) => {
    if (!birthDate || isNaN(birthDate.getTime())) return null;

    const bMonth = birthDate.getMonth();
    const bDay = birthDate.getDate();
    const bHours = birthDate.getHours() || 0;
    const bMinutes = birthDate.getMinutes() || 0;
    const bSeconds = birthDate.getSeconds() || 0;

    const currentYear = now.getFullYear();

    // Helper to construct a safe birthday date for a specific year
    const constructBirthdayDate = (year) => {
      // Handle Feb 29 for non-leap years (celebrate on Feb 28)
      if (bMonth === 1 && bDay === 29 && !AgeCalculator.isLeapYear(year)) {
        return new Date(year, 1, 28, bHours, bMinutes, bSeconds, 0);
      }
      return new Date(year, bMonth, bDay, bHours, bMinutes, bSeconds, 0);
    };

    let nextBirthday = constructBirthdayDate(currentYear);
    let lastBirthday = constructBirthdayDate(currentYear - 1);

    // Check if today is birthday
    const isToday = (
      now.getMonth() === bMonth &&
      (now.getDate() === bDay || (bMonth === 1 && bDay === 29 && !AgeCalculator.isLeapYear(currentYear) && now.getDate() === 28))
    );

    // If this year's birthday timestamp has already passed, next birthday is next year
    if (now.getTime() >= nextBirthday.getTime() && !isToday) {
      lastBirthday = nextBirthday;
      nextBirthday = constructBirthdayDate(currentYear + 1);
    }

    // Time difference
    let diffMs = nextBirthday.getTime() - now.getTime();
    if (diffMs < 0 && isToday) {
      diffMs = 0;
    }

    const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Progress percentage of the birthday cycle (from lastBirthday to nextBirthday)
    const cycleTotalMs = nextBirthday.getTime() - lastBirthday.getTime();
    const cycleElapsedMs = now.getTime() - lastBirthday.getTime();
    const progressPercent = Math.min(100, Math.max(0, (cycleElapsedMs / cycleTotalMs) * 100));

    // Next turning age
    const nextAge = nextBirthday.getFullYear() - birthDate.getFullYear();

    // Formatted date string
    const weekday = AgeCalculator.WEEKDAYS[nextBirthday.getDay()];
    const monthName = AgeCalculator.MONTH_NAMES[nextBirthday.getMonth()];
    const formattedDate = `${weekday}, ${monthName} ${nextBirthday.getDate()}, ${nextBirthday.getFullYear()}`;

    return {
      isToday,
      nextBirthday,
      nextAge,
      formattedDate,
      weekday,
      days,
      hours,
      minutes,
      seconds,
      progressPercent: parseFloat(progressPercent.toFixed(1))
    };
  };

  return {
    getNextBirthdayInfo
  };
})();

