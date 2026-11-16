/**
 * ChronoAge — Milestones Module
 * Computes day-based and year-based life milestones with exact dates,
 * countdowns, and completion states.
 */

const LifeMilestones = (() => {
  const MILESTONE_DEFINITIONS = [
    // Day Milestones
    { type: 'day', count: 1000, name: '1,000 Days on Earth', desc: 'Toddlerhood exploration era' },
    { type: 'day', count: 5000, name: '5,000 Days on Earth', desc: 'Entering youth and teenagerhood' },
    { type: 'day', count: 10000, name: '10,000 Days on Earth', desc: 'Over 27 years of vibrant memories' },
    { type: 'day', count: 15000, name: '15,000 Days on Earth', desc: 'Reaching 41+ years of accumulated wisdom' },
    { type: 'day', count: 20000, name: '20,000 Days on Earth', desc: 'A rich tapestry of over 54 years' },
    { type: 'day', count: 25000, name: '25,000 Days on Earth', desc: 'Approaching 7 decades of living' },
    { type: 'day', count: 30000, name: '30,000 Days on Earth', desc: 'Over 82 years of profound living' },

    // Year Milestones
    { type: 'year', count: 1, name: '1st Birthday', desc: 'First complete journey around the sun' },
    { type: 'year', count: 10, name: '10th Birthday', desc: 'Entering the double-digits decade' },
    { type: 'year', count: 18, name: '18th Birthday', desc: 'Stepping into legal adulthood' },
    { type: 'year', count: 21, name: '21st Birthday', desc: 'Universal key to complete independence' },
    { type: 'year', count: 25, name: '25th Birthday', desc: 'Silver quarter-century celebration' },
    { type: 'year', count: 30, name: '30th Birthday', desc: 'The golden age of ambition and clarity' },
    { type: 'year', count: 40, name: '40th Birthday', desc: 'Life begins at forty with renewed purpose' },
    { type: 'year', count: 50, name: '50th Birthday', desc: 'Golden Jubilee — Half a century lived' },
    { type: 'year', count: 60, name: '60th Birthday', desc: 'Diamond era of fulfillment and legacy' },
    { type: 'year', count: 75, name: '75th Birthday', desc: 'Platinum jubilee of immense wisdom' },
    { type: 'year', count: 100, name: '100th Birthday', desc: 'Centenarian legend — 100 years of history' }
  ];

  /**
   * Calculates all milestones for a birth date.
   * @param {Date} birthDate
   * @param {Date} now
   */
  const calculateMilestones = (birthDate, now = new Date()) => {
    if (!birthDate || isNaN(birthDate.getTime())) return [];

    const bYear = birthDate.getFullYear();
    const bMonth = birthDate.getMonth();
    const bDay = birthDate.getDate();

    const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    const results = MILESTONE_DEFINITIONS.map(item => {
      let targetDate;

      if (item.type === 'day') {
        // Add days in ms
        targetDate = new Date(birthDate.getTime() + (item.count * 24 * 60 * 60 * 1000));
      } else {
        // Year milestone
        const targetYear = bYear + item.count;
        const maxDays = AgeCalculator.getDaysInMonth(targetYear, bMonth);
        const safeDay = Math.min(bDay, maxDays);
        targetDate = new Date(targetYear, bMonth, safeDay, birthDate.getHours(), birthDate.getMinutes());
      }

      const targetMidnight = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).getTime();
      const diffMs = targetMidnight - nowMidnight;
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

      let status = 'upcoming';
      let statusText = '';

      if (diffDays === 0) {
        status = 'today';
        statusText = 'Happening Today!';
      } else if (diffDays < 0) {
        status = 'achieved';
        const absDays = Math.abs(diffDays);
        if (absDays >= 365) {
          const yrs = (absDays / 365.25).toFixed(1);
          statusText = `Achieved ${LifeStatistics.formatNumber(absDays)} days ago (~${yrs} yrs)`;
        } else {
          statusText = `Achieved ${LifeStatistics.formatNumber(absDays)} days ago`;
        }
      } else {
        status = 'upcoming';
        if (diffDays >= 365) {
          const yrs = (diffDays / 365.25).toFixed(1);
          statusText = `In ${LifeStatistics.formatNumber(diffDays)} days (~${yrs} yrs)`;
        } else {
          statusText = `In ${LifeStatistics.formatNumber(diffDays)} days`;
        }
      }

      const weekday = AgeCalculator.WEEKDAYS[targetDate.getDay()];
      const monthName = AgeCalculator.MONTH_NAMES[targetDate.getMonth()];
      const formattedDate = `${weekday}, ${monthName} ${targetDate.getDate()}, ${targetDate.getFullYear()}`;

      return {
        ...item,
        targetDate,
        formattedDate,
        status,
        statusText,
        diffDays
      };
    });

    // Sort chronologically by targetDate
    return results.sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime());
  };

  return {
    calculateMilestones
  };
})();

