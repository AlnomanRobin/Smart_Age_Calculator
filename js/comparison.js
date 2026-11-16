/**
 * ChronoAge — Age Comparison Module
 * Compares two distinct birth dates to analyze the age gap,
 * who is older, and comparative life statistics.
 */

const AgeComparison = (() => {
  /**
   * Compares two individuals' birth dates.
   * @param {Object} person1 { name, birthDate }
   * @param {Object} person2 { name, birthDate }
   * @param {Date} now
   */
  const compareAges = (person1, person2, now = new Date()) => {
    if (!person1.birthDate || !person2.birthDate) {
      return { valid: false, error: 'Both birth dates are required for comparison.' };
    }

    const p1Date = new Date(person1.birthDate);
    const p2Date = new Date(person2.birthDate);

    if (isNaN(p1Date.getTime()) || isNaN(p2Date.getTime())) {
      return { valid: false, error: 'Please enter valid calendar dates.' };
    }

    if (p1Date.getTime() > now.getTime() || p2Date.getTime() > now.getTime()) {
      return { valid: false, error: 'Birth dates cannot be in the future.' };
    }

    const p1Name = (person1.name || 'Person 1').trim();
    const p2Name = (person2.name || 'Person 2').trim();

    // Determine who is older (earlier birth timestamp)
    let olderPerson, youngerPerson;
    let isSameAge = false;

    if (p1Date.getTime() < p2Date.getTime()) {
      olderPerson = { name: p1Name, birthDate: p1Date, isPerson1: true };
      youngerPerson = { name: p2Name, birthDate: p2Date, isPerson1: false };
    } else if (p2Date.getTime() < p1Date.getTime()) {
      olderPerson = { name: p2Name, birthDate: p2Date, isPerson1: false };
      youngerPerson = { name: p1Name, birthDate: p1Date, isPerson1: true };
    } else {
      isSameAge = true;
      olderPerson = { name: p1Name, birthDate: p1Date, isPerson1: true };
      youngerPerson = { name: p2Name, birthDate: p2Date, isPerson1: false };
    }

    // Exact difference calculation (between older DOB and younger DOB)
    const exactDiff = isSameAge 
      ? { years: 0, months: 0, days: 0 }
      : AgeCalculator.calculateExactAge(olderPerson.birthDate, youngerPerson.birthDate);

    // Total difference units
    const diffMs = Math.abs(p2Date.getTime() - p1Date.getTime());
    const totalDaysDiff = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalHoursDiff = Math.floor(diffMs / (1000 * 60 * 60));
    const totalWeeksDiff = Math.floor(totalDaysDiff / 7);
    const weekendsDiff = Math.floor((totalDaysDiff / 7) * 2);

    // Calculate both individual ages today
    const p1AgeToday = AgeCalculator.calculateExactAge(p1Date, now);
    const p2AgeToday = AgeCalculator.calculateExactAge(p2Date, now);

    // Formatted verdict
    let verdictTitle = '';
    let verdictDesc = '';

    if (isSameAge) {
      verdictTitle = `${p1Name} and ${p2Name} were born on the exact same date!`;
      verdictDesc = 'You are cosmic age twins sharing the exact same chronological journey!';
    } else {
      verdictTitle = `${olderPerson.name} is older than ${youngerPerson.name}`;
      verdictDesc = `${olderPerson.name} has lived ${LifeStatistics.formatNumber(totalDaysDiff)} more days (${LifeStatistics.formatNumber(totalHoursDiff)} more hours), experiencing approximately ${LifeStatistics.formatNumber(weekendsDiff)} more weekend days!`;
    }

    return {
      valid: true,
      isSameAge,
      olderPerson,
      youngerPerson,
      yearsDiff: exactDiff.years,
      monthsDiff: exactDiff.months,
      daysDiff: exactDiff.days,
      totalDaysDiff,
      totalWeeksDiff,
      totalHoursDiff,
      weekendsDiff,
      p1Name,
      p2Name,
      p1AgeToday,
      p2AgeToday,
      verdictTitle,
      verdictDesc
    };
  };

  return {
    compareAges
  };
})();

