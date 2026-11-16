/**
 * ChronoAge — Planetary Age Module
 * Computes exact chronological age on all 8 planets of our solar system
 * based on official NASA sidereal orbital periods.
 */

const PlanetaryAge = (() => {
  const PLANETS = [
    {
      name: 'Mercury',
      cssClass: 'sphere-mercury',
      orbitalPeriodDays: 87.969,
      orbitalPeriodYears: 0.2408467,
      funFact: 'A year on Mercury is shorter than a single day on Venus!'
    },
    {
      name: 'Venus',
      cssClass: 'sphere-venus',
      orbitalPeriodDays: 224.701,
      orbitalPeriodYears: 0.61519726,
      funFact: 'Venus rotates backwards compared to most other planets.'
    },
    {
      name: 'Earth',
      cssClass: 'sphere-earth',
      orbitalPeriodDays: 365.25636,
      orbitalPeriodYears: 1.0,
      funFact: 'The only known planetary haven teeming with life.'
    },
    {
      name: 'Mars',
      cssClass: 'sphere-mars',
      orbitalPeriodDays: 686.980,
      orbitalPeriodYears: 1.8808158,
      funFact: 'Home to Olympus Mons, a volcano 3x the height of Everest.'
    },
    {
      name: 'Jupiter',
      cssClass: 'sphere-jupiter',
      orbitalPeriodDays: 4332.589,
      orbitalPeriodYears: 11.862615,
      funFact: 'The colossal giant holding over 2.5x the mass of all other planets combined.'
    },
    {
      name: 'Saturn',
      cssClass: 'sphere-saturn',
      hasRing: true,
      orbitalPeriodDays: 10759.22,
      orbitalPeriodYears: 29.447498,
      funFact: 'Its majestic rings are made of pure ice chunks and cosmic dust.'
    },
    {
      name: 'Uranus',
      cssClass: 'sphere-uranus',
      orbitalPeriodDays: 30685.4,
      orbitalPeriodYears: 84.016846,
      funFact: 'Rotates on its side with a dramatic 98-degree axial tilt.'
    },
    {
      name: 'Neptune',
      cssClass: 'sphere-neptune',
      orbitalPeriodDays: 60189.0,
      orbitalPeriodYears: 164.79132,
      funFact: 'Endures supersonic winds reaching up to 2,100 km/h.'
    }
  ];

  /**
   * Computes planetary ages and next planetary birthdays.
   * @param {Date} birthDate
   * @param {Date} now
   */
  const calculatePlanetaryAges = (birthDate, now = new Date()) => {
    if (!birthDate || isNaN(birthDate.getTime())) return [];

    const totalMs = Math.max(0, now.getTime() - birthDate.getTime());
    const totalEarthDays = totalMs / (1000 * 60 * 60 * 24);

    return PLANETS.map(planet => {
      const planetaryAgeExact = totalEarthDays / planet.orbitalPeriodDays;
      const wholeYears = Math.floor(planetaryAgeExact);
      const nextPlanetaryAge = wholeYears + 1;
      
      // Calculate Earth days until next planetary birthday
      const earthDaysToNextBirthday = Math.max(0, (nextPlanetaryAge * planet.orbitalPeriodDays) - totalEarthDays);
      const nextBirthdayDate = new Date(now.getTime() + (earthDaysToNextBirthday * 24 * 60 * 60 * 1000));
      
      const nextBdayFormatted = `${AgeCalculator.MONTH_NAMES[nextBirthdayDate.getMonth()]} ${nextBirthdayDate.getDate()}, ${nextBirthdayDate.getFullYear()}`;

      return {
        name: planet.name,
        cssClass: planet.cssClass,
        hasRing: !!planet.hasRing,
        orbitalPeriodDays: planet.orbitalPeriodDays,
        orbitalPeriodYears: planet.orbitalPeriodYears,
        age: parseFloat(planetaryAgeExact.toFixed(2)),
        wholeYears,
        nextPlanetaryAge,
        daysUntilNextBirthday: Math.ceil(earthDaysToNextBirthday),
        nextBirthdayFormatted: nextBdayFormatted,
        funFact: planet.funFact
      };
    });
  };

  return {
    calculatePlanetaryAges,
    PLANETS
  };
})();

