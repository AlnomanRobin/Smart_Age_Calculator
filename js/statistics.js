/**
 * ChronoAge — Statistics & Fun Facts Module
 * Calculates biological estimates, astronomical journey distance,
 * lifestyle statistics, and milestone projections.
 */

const LifeStatistics = (() => {
  /**
   * Calculates exact weekend count (Saturdays and Sundays) between birthDate and now.
   */
  const countWeekends = (birthDate, now = new Date()) => {
    let count = 0;
    const cur = new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const totalDays = Math.floor((end - cur) / (1000 * 60 * 60 * 24));
    if (totalDays <= 0) return 0;

    // Fast calculation: full weeks contain 2 weekend days
    const fullWeeks = Math.floor(totalDays / 7);
    count = fullWeeks * 2;

    // Remaining partial week
    const startDay = cur.getDay();
    const remDays = totalDays % 7;
    for (let i = 0; i < remDays; i++) {
      const day = (startDay + i) % 7;
      if (day === 0 || day === 6) { // 0: Sunday, 6: Saturday
        count++;
      }
    }
    return count;
  };

  /**
   * Generates comprehensive life statistics and fun facts.
   */
  const generateStats = (birthDate, now = new Date()) => {
    if (!birthDate || isNaN(birthDate.getTime())) return null;

    const diffMs = Math.max(0, now.getTime() - birthDate.getTime());
    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = Math.floor(totalDays / 30.4375); // Astronomical average month
    const totalYearsExact = totalDays / 365.2425;

    // Weekend stats
    const weekendDaysLived = countWeekends(birthDate, now);
    const weekendPairsLived = Math.floor(weekendDaysLived / 2);

    // Biological Estimates (clearly labeled)
    // Average resting heart rate: ~80 beats per minute
    const estimatedHeartbeats = Math.floor(totalMinutes * 80);

    // Average respiration: ~16 breaths per minute
    const estimatedBreaths = Math.floor(totalMinutes * 16);

    // Average sleep: ~8 hours per day
    const estimatedSleepHours = Math.floor(totalDays * 8);
    const estimatedSleepYears = (estimatedSleepHours / (365.25 * 24)).toFixed(1);

    // Average blinks: ~15 blinks/min for 16 waking hours/day (~14,400 per day)
    const estimatedBlinks = Math.floor(totalDays * 14400);

    // Average meals: ~3 meals per day
    const estimatedMeals = Math.floor(totalDays * 3);

    // Astronomical journey: Earth orbits the Sun at ~29.78 km/s (~940,000,000 km per Earth year)
    const solarDistanceKm = Math.floor(totalYearsExact * 940000000);

    // Global life expectancy benchmark: 80.0 years
    const lifeExpectancyTarget = 80;
    const lifeExpectancyPercent = Math.min(100, (totalYearsExact / lifeExpectancyTarget) * 100).toFixed(1);

    // Next Milestone Teaser
    const currentAgeYears = Math.floor(totalYearsExact);
    const milestoneAges = [1, 5, 10, 13, 16, 18, 21, 25, 30, 40, 50, 60, 65, 70, 75, 80, 90, 100];
    const nextMilestoneAge = milestoneAges.find(m => m > currentAgeYears) || currentAgeYears + 5;
    const nextMilestoneDate = new Date(birthDate.getFullYear() + nextMilestoneAge, birthDate.getMonth(), birthDate.getDate());
    const daysUntilNextMilestone = Math.max(0, Math.ceil((nextMilestoneDate - now) / (1000 * 60 * 60 * 24)));

    return {
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      totalSeconds,
      weekendDaysLived,
      weekendPairsLived,
      estimatedHeartbeats,
      estimatedBreaths,
      estimatedSleepHours,
      estimatedSleepYears,
      estimatedBlinks,
      estimatedMeals,
      solarDistanceKm,
      lifeExpectancyPercent,
      lifeExpectancyTarget,
      nextMilestoneAge,
      daysUntilNextMilestone
    };
  };

  /**
   * Formats large numbers with friendly commas or abbreviated units.
   */
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatDistance = (km) => {
    if (km >= 1e9) {
      return (km / 1e9).toFixed(2) + ' Billion km';
    }
    if (km >= 1e6) {
      return (km / 1e6).toFixed(1) + ' Million km';
    }
    return formatNumber(km) + ' km';
  };

  return {
    generateStats,
    formatNumber,
    formatDistance
  };
})();

