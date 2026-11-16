/**
 * ChronoAge — Main Application Controller
 * Handles UI interactions, animated counters, live timers,
 * modals, toast notifications, sharing, printing, and confetti.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========================================================================
  // DOM Cache
  // ========================================================================
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Calculator Form
  const birthDateInput = document.getElementById('birthDateInput');
  const birthTimeInput = document.getElementById('birthTimeInput');
  const targetDateInput = document.getElementById('targetDateInput');
  const clearDateBtn = document.getElementById('clearDateBtn');
  const btnCalculate = document.getElementById('btnCalculate');
  const toggleAdvancedBtn = document.getElementById('toggleAdvancedBtn');
  const advancedOptionsPanel = document.getElementById('advancedOptionsPanel');
  const quickChips = document.querySelectorAll('.quick-chip');

  // Results Showcase
  const resultsContainer = document.getElementById('resultsContainer');
  const resYears = document.getElementById('resYears');
  const resMonths = document.getElementById('resMonths');
  const resDays = document.getElementById('resDays');
  const resTotalMonths = document.getElementById('resTotalMonths');
  const resTotalWeeks = document.getElementById('resTotalWeeks');
  const resTotalDays = document.getElementById('resTotalDays');
  const resTotalHours = document.getElementById('resTotalHours');
  const resTotalMinutes = document.getElementById('resTotalMinutes');
  const resTotalSeconds = document.getElementById('resTotalSeconds');

  // Quick Action Buttons
  const btnSaveCurrentProfile = document.getElementById('btnSaveCurrentProfile');
  const btnShareResult = document.getElementById('btnShareResult');
  const btnCopyResult = document.getElementById('btnCopyResult');
  const btnPrintReport = document.getElementById('btnPrintReport');
  const btnResetCalc = document.getElementById('btnResetCalc');

  // Birthday Countdown
  const nextBdayFormatted = document.getElementById('nextBdayFormatted');
  const nextBdayWeekday = document.getElementById('nextBdayWeekday');
  const countdownDays = document.getElementById('countdownDays');
  const countdownHours = document.getElementById('countdownHours');
  const countdownMinutes = document.getElementById('countdownMinutes');
  const countdownSeconds = document.getElementById('countdownSeconds');
  const bdayProgressFill = document.getElementById('bdayProgressFill');
  const bdayProgressPercent = document.getElementById('bdayProgressPercent');
  const birthdayTodayCard = document.getElementById('birthdayTodayCard');
  const btnCelebrate = document.getElementById('btnCelebrate');

  // Cosmic Identity & Day of Birth
  const birthWeekdayTitle = document.getElementById('birthWeekdayTitle');
  const birthWeekdayDesc = document.getElementById('birthWeekdayDesc');
  const zodiacSignName = document.getElementById('zodiacSignName');
  const zodiacSymbol = document.getElementById('zodiacSymbol');
  const zodiacElement = document.getElementById('zodiacElement');
  const zodiacPlanet = document.getElementById('zodiacPlanet');
  const zodiacTrait = document.getElementById('zodiacTrait');
  const chineseAnimalName = document.getElementById('chineseAnimalName');
  const chineseElement = document.getElementById('chineseElement');
  const chineseTrait = document.getElementById('chineseTrait');
  const birthSeasonBadge = document.getElementById('birthSeasonBadge');
  const birthSeasonDesc = document.getElementById('birthSeasonDesc');
  const birthstoneName = document.getElementById('birthstoneName');
  const birthFlowerName = document.getElementById('birthFlowerName');

  // Life Statistics
  const statTotalDays = document.getElementById('statTotalDays');
  const statTotalWeeks = document.getElementById('statTotalWeeks');
  const statTotalMonths = document.getElementById('statTotalMonths');
  const statTotalHours = document.getElementById('statTotalHours');
  const statTotalMinutes = document.getElementById('statTotalMinutes');
  const statTotalSeconds = document.getElementById('statTotalSeconds');
  const lifeExpPercent = document.getElementById('lifeExpPercent');
  const lifeExpBar = document.getElementById('lifeExpBar');

  // Fun Facts
  const factHeartbeats = document.getElementById('factHeartbeats');
  const factBreaths = document.getElementById('factBreaths');
  const factWeekends = document.getElementById('factWeekends');
  const factSleepHours = document.getElementById('factSleepHours');
  const factSleepYears = document.getElementById('factSleepYears');
  const factSolarDistance = document.getElementById('factSolarDistance');
  const factBlinks = document.getElementById('factBlinks');
  const factMeals = document.getElementById('factMeals');
  const factNextMilestone = document.getElementById('factNextMilestone');

  // Planetary Grid
  const planetsGrid = document.getElementById('planetsGrid');

  // Milestones Timeline
  const milestonesGrid = document.getElementById('milestonesGrid');
  const milestoneFilters = document.querySelectorAll('.filter-btn');

  // Age Comparison
  const compPerson1Name = document.getElementById('compPerson1Name');
  const compPerson1Date = document.getElementById('compPerson1Date');
  const compPerson2Name = document.getElementById('compPerson2Name');
  const compPerson2Date = document.getElementById('compPerson2Date');
  const btnRunCompare = document.getElementById('btnRunCompare');
  const compResultsPanel = document.getElementById('compResultsPanel');
  const compVerdictTitle = document.getElementById('compVerdictTitle');
  const compVerdictDesc = document.getElementById('compVerdictDesc');
  const compDiffYears = document.getElementById('compDiffYears');
  const compDiffMonths = document.getElementById('compDiffMonths');
  const compDiffDays = document.getElementById('compDiffDays');
  const compTotalDays = document.getElementById('compTotalDays');
  const compTotalHours = document.getElementById('compTotalHours');
  const compWeekendsDiff = document.getElementById('compWeekendsDiff');

  // Saved Profiles Modal & Drawer
  const btnOpenProfiles = document.getElementById('btnOpenProfiles');
  const profilesModal = document.getElementById('profilesModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const profilesCountBadge = document.getElementById('profilesCountBadge');
  const savedProfilesList = document.getElementById('savedProfilesList');
  const historyList = document.getElementById('historyList');
  const saveProfileForm = document.getElementById('saveProfileForm');
  const newProfileName = document.getElementById('newProfileName');
  const newProfileTag = document.getElementById('newProfileTag');

  // Toast Container
  const toastContainer = document.getElementById('toastContainer');

  // Canvas Confetti
  const confettiCanvas = document.getElementById('confettiCanvas');

  // State Variables
  let currentBirthDate = null;
  let currentTargetDate = null;
  let activeTickerInterval = null;
  let activeMilestoneFilter = 'all';
  let cachedMilestones = [];

  // ========================================================================
  // 1. Theme Initialization & Toggle
  // ========================================================================
  const initTheme = () => {
    const savedTheme = StorageManager.getSavedTheme();
    htmlEl.setAttribute('data-theme', savedTheme);
  };

  const toggleTheme = () => {
    const currentTheme = htmlEl.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', newTheme);
    StorageManager.saveTheme(newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Night' : 'Day'} Mode`, 'info');
  };

  themeToggleBtn.addEventListener('click', toggleTheme);
  initTheme();

  // ========================================================================
  // 2. Navigation & Mobile Menu
  // ========================================================================
  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    mobileMenuBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  });

  // ========================================================================
  // 3. Toast Notifications
  // ========================================================================
  const showToast = (message, type = 'info', duration = 3500) => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'fa-circle-info';
    if (type === 'success') icon = 'fa-circle-check';
    if (type === 'error') icon = 'fa-circle-exclamation';
    if (type === 'warning') icon = 'fa-triangle-exclamation';

    toast.innerHTML = `
      <i class="fa-solid ${icon} toast-icon"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-hiding');
      toast.addEventListener('animationend', () => {
        toast.remove();
      });
    }, duration);
  };

  // ========================================================================
  // 4. Smooth Counter Animation (Ease-Out Quad)
  // ========================================================================
  const animateCounter = (element, targetValue, duration = 1200, isFormatted = false) => {
    if (!element) return;
    const startValue = 0;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quad
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(startValue + (targetValue - startValue) * easeProgress);

      element.textContent = isFormatted ? LifeStatistics.formatNumber(current) : current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = isFormatted ? LifeStatistics.formatNumber(targetValue) : targetValue;
      }
    };

    requestAnimationFrame(update);
  };

  // ========================================================================
  // 5. Main Age Calculation Orchestrator
  // ========================================================================
  const getSelectedDates = () => {
    const dateVal = birthDateInput.value;
    if (!dateVal) return { birthDate: null, targetDate: null };

    const timeVal = birthTimeInput.value || '00:00';
    const [hours, minutes] = timeVal.split(':').map(Number);
    const [year, month, day] = dateVal.split('-').map(Number);

    const birthDate = new Date(year, month - 1, day, hours, minutes, 0);

    let targetDate = new Date();
    if (targetDateInput.value) {
      const [tYear, tMonth, tDay] = targetDateInput.value.split('-').map(Number);
      targetDate = new Date(tYear, tMonth - 1, tDay, 23, 59, 59);
    }

    return { birthDate, targetDate };
  };

  const executeCalculation = (silentToast = false) => {
    const { birthDate, targetDate } = getSelectedDates();

    if (!birthDate) {
      if (!silentToast) showToast('Please enter your date of birth.', 'warning');
      return;
    }

    if (birthDate.getTime() > targetDate.getTime()) {
      showToast('Date of birth cannot be in the future.', 'error');
      return;
    }

    currentBirthDate = birthDate;
    currentTargetDate = targetDate;

    // Run core calculations
    const ageResult = AgeCalculator.calculateExactAge(birthDate, targetDate);
    if (!ageResult.valid) {
      showToast(ageResult.error, 'error');
      return;
    }

    // 1. Render Hero Age Counters
    animateCounter(resYears, ageResult.years, 800);
    animateCounter(resMonths, ageResult.months, 800);
    animateCounter(resDays, ageResult.days, 800);

    // 2. Render Secondary Unit Breakdowns
    animateCounter(resTotalMonths, ageResult.totalUnits.totalMonths, 1000, true);
    animateCounter(resTotalWeeks, ageResult.totalUnits.totalWeeks, 1000, true);
    animateCounter(resTotalDays, ageResult.totalUnits.totalDays, 1000, true);
    animateCounter(resTotalHours, ageResult.totalUnits.totalHours, 1200, true);
    animateCounter(resTotalMinutes, ageResult.totalUnits.totalMinutes, 1200, true);
    animateCounter(resTotalSeconds, ageResult.totalUnits.totalSeconds, 1400, true);

    // Show Results Panel
    resultsContainer.style.display = 'block';

    // 3. Render Next Birthday Countdown
    renderCountdown(birthDate);

    // 4. Render Cosmic Identity & Weekday Lore
    renderCosmicIdentity(birthDate);

    // 5. Render Life Statistics & Biological Metrics
    renderLifeStatistics(birthDate, targetDate);

    // 6. Render Fun Age Facts
    renderFunFacts(birthDate, targetDate);

    // 7. Render Planetary Ages
    renderPlanetaryAges(birthDate);

    // 8. Render Life Milestones
    renderMilestones(birthDate);

    // 9. Sync to Person 1 in comparison tab for convenience
    if (compPerson1Date && !compPerson1Date.value) {
      compPerson1Date.value = birthDateInput.value;
    }

    // 10. Save to calculation history
    const summaryStr = `${ageResult.years} yrs, ${ageResult.months} mos, ${ageResult.days} days`;
    StorageManager.addToHistory({
      birthDate: birthDateInput.value,
      birthTime: birthTimeInput.value,
      ageSummary: summaryStr
    });
    renderHistoryList();

    // Start live ticker timer for seconds and countdown
    startLiveTicker();

    if (!silentToast) {
      showToast('Calculations updated successfully!', 'success');
    }
  };

  // ========================================================================
  // 6. Live Ticker Timer
  // ========================================================================
  const startLiveTicker = () => {
    if (activeTickerInterval) clearInterval(activeTickerInterval);

    activeTickerInterval = setInterval(() => {
      if (!currentBirthDate) return;

      const now = new Date();
      // Only tick real-time if calculating against now (no custom target date)
      if (!targetDateInput.value) {
        const totalMs = now.getTime() - currentBirthDate.getTime();
        const totalSec = Math.floor(totalMs / 1000);
        if (resTotalSeconds) {
          resTotalSeconds.textContent = LifeStatistics.formatNumber(totalSec);
        }
      }

      // Update countdown numbers every second
      const bdayInfo = BirthdayCountdown.getNextBirthdayInfo(currentBirthDate, now);
      if (bdayInfo) {
        countdownDays.textContent = LifeStatistics.formatNumber(bdayInfo.days);
        countdownHours.textContent = String(bdayInfo.hours).padStart(2, '0');
        countdownMinutes.textContent = String(bdayInfo.minutes).padStart(2, '0');
        countdownSeconds.textContent = String(bdayInfo.seconds).padStart(2, '0');
      }
    }, 1000);
  };

  // ========================================================================
  // 7. Render Next Birthday
  // ========================================================================
  const renderCountdown = (birthDate) => {
    const bdayInfo = BirthdayCountdown.getNextBirthdayInfo(birthDate, new Date());
    if (!bdayInfo) return;

    nextBdayFormatted.textContent = bdayInfo.formattedDate;
    nextBdayWeekday.textContent = `Turns ${bdayInfo.nextAge} on ${bdayInfo.weekday}`;

    countdownDays.textContent = LifeStatistics.formatNumber(bdayInfo.days);
    countdownHours.textContent = String(bdayInfo.hours).padStart(2, '0');
    countdownMinutes.textContent = String(bdayInfo.minutes).padStart(2, '0');
    countdownSeconds.textContent = String(bdayInfo.seconds).padStart(2, '0');

    bdayProgressFill.style.width = `${bdayInfo.progressPercent}%`;
    bdayProgressPercent.textContent = `${bdayInfo.progressPercent}%`;

    if (bdayInfo.isToday) {
      birthdayTodayCard.classList.add('active');
      triggerConfetti();
    } else {
      birthdayTodayCard.classList.remove('active');
    }
  };

  // ========================================================================
  // 8. Render Cosmic Identity & Weekday Lore
  // ========================================================================
  const renderCosmicIdentity = (birthDate) => {
    const details = AgeCalculator.getBirthDetails(birthDate);

    birthWeekdayTitle.textContent = details.dayOfWeek;
    birthWeekdayDesc.textContent = `You entered the world on a notable ${details.dayOfWeek}, embarking on your earthly voyage.`;

    // Western Zodiac
    zodiacSignName.textContent = details.zodiac.sign;
    zodiacSymbol.textContent = details.zodiac.symbol;
    zodiacElement.textContent = `Element: ${details.zodiac.element}`;
    zodiacPlanet.textContent = `Ruler: ${details.zodiac.planet}`;
    zodiacTrait.textContent = `“${details.zodiac.trait}”`;

    // Chinese Zodiac
    chineseAnimalName.textContent = `Year of the ${details.chineseZodiac.animal}`;
    chineseElement.textContent = `Fixed Element: ${details.chineseZodiac.element}`;
    chineseTrait.textContent = `“${details.chineseZodiac.trait}”`;

    // Season, Stone, Flower
    birthSeasonBadge.textContent = `${details.season}`;
    birthSeasonDesc.textContent = `Born during the vibrant ${details.season} season in the month of ${details.monthName}.`;
    birthstoneName.textContent = details.birthstone;
    birthFlowerName.textContent = details.birthFlower;
  };

  // ========================================================================
  // 9. Render Life Statistics & Biological Metrics
  // ========================================================================
  const renderLifeStatistics = (birthDate, targetDate) => {
    const stats = LifeStatistics.generateStats(birthDate, targetDate);
    if (!stats) return;

    animateCounter(statTotalDays, stats.totalDays, 800, true);
    animateCounter(statTotalWeeks, stats.totalWeeks, 800, true);
    animateCounter(statTotalMonths, stats.totalMonths, 800, true);
    animateCounter(statTotalHours, stats.totalHours, 1000, true);
    animateCounter(statTotalMinutes, stats.totalMinutes, 1000, true);
    animateCounter(statTotalSeconds, stats.totalSeconds, 1200, true);

    lifeExpPercent.textContent = `${stats.lifeExpectancyPercent}%`;
    lifeExpBar.style.width = `${stats.lifeExpectancyPercent}%`;
  };

  // ========================================================================
  // 10. Render Fun Facts
  // ========================================================================
  const renderFunFacts = (birthDate, targetDate) => {
    const stats = LifeStatistics.generateStats(birthDate, targetDate);
    if (!stats) return;

    animateCounter(factHeartbeats, stats.estimatedHeartbeats, 1200, true);
    animateCounter(factBreaths, stats.estimatedBreaths, 1200, true);
    animateCounter(factWeekends, stats.weekendDaysLived, 1000, true);
    animateCounter(factSleepHours, stats.estimatedSleepHours, 1000, true);
    factSleepYears.textContent = `~${stats.estimatedSleepYears} years spent dreaming`;

    factSolarDistance.textContent = LifeStatistics.formatDistance(stats.solarDistanceKm);
    animateCounter(factBlinks, stats.estimatedBlinks, 1200, true);
    animateCounter(factMeals, stats.estimatedMeals, 1000, true);
    factNextMilestone.textContent = `Turning ${stats.nextMilestoneAge} in ${LifeStatistics.formatNumber(stats.daysUntilNextMilestone)} days`;
  };

  // ========================================================================
  // 11. Render Planetary Ages
  // ========================================================================
  const renderPlanetaryAges = (birthDate) => {
    const planets = PlanetaryAge.calculatePlanetaryAges(birthDate, new Date());
    planetsGrid.innerHTML = '';

    planets.forEach(p => {
      const card = document.createElement('div');
      card.className = 'planet-card';

      card.innerHTML = `
        <div class="planet-sphere-wrap">
          <div class="planet-sphere ${p.cssClass}"></div>
          ${p.hasRing ? '<div class="saturn-ring"></div>' : ''}
        </div>
        <h4 class="planet-name">${p.name}</h4>
        <div class="planet-orbit-info">Orbital Period: ${p.orbitalPeriodDays} Earth Days</div>
        <div class="planet-age-val">${p.age}</div>
        <div class="planet-age-label">${p.name} Years Old</div>
        <div class="planet-meta-badge">
          Next Birthday in ${LifeStatistics.formatNumber(p.daysUntilNextBirthday)} Earth days
        </div>
      `;
      planetsGrid.appendChild(card);
    });
  };

  // ========================================================================
  // 12. Render Life Milestones
  // ========================================================================
  const renderMilestones = (birthDate) => {
    cachedMilestones = LifeMilestones.calculateMilestones(birthDate, new Date());
    applyMilestoneFilter(activeMilestoneFilter);
  };

  const applyMilestoneFilter = (filter) => {
    activeMilestoneFilter = filter;
    milestoneFilters.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    const filtered = cachedMilestones.filter(m => {
      if (filter === 'all') return true;
      if (filter === 'achieved') return m.status === 'achieved';
      if (filter === 'upcoming') return m.status === 'upcoming' || m.status === 'today';
      return true;
    });

    milestonesGrid.innerHTML = '';
    if (filtered.length === 0) {
      milestonesGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">No milestones found in this category.</div>`;
      return;
    }

    filtered.forEach(m => {
      const item = document.createElement('div');
      item.className = `milestone-item ${m.status}`;

      let badgeClass = 'badge-upcoming';
      if (m.status === 'achieved') badgeClass = 'badge-achieved';
      if (m.status === 'today') badgeClass = 'badge-today';

      item.innerHTML = `
        <div class="milestone-status-bar"></div>
        <div>
          <div class="milestone-top">
            <span class="milestone-badge ${badgeClass}">${m.statusText}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted);"><i class="fa-regular fa-calendar"></i></span>
          </div>
          <div class="milestone-name">${m.name}</div>
          <div class="milestone-date">${m.formattedDate}</div>
        </div>
        <div class="milestone-time-diff">${m.desc}</div>
      `;
      milestonesGrid.appendChild(item);
    });
  };

  milestoneFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      applyMilestoneFilter(btn.dataset.filter);
    });
  });

  // ========================================================================
  // 13. Age Comparison
  // ========================================================================
  btnRunCompare.addEventListener('click', () => {
    const p1 = { name: compPerson1Name.value || 'Person 1', birthDate: compPerson1Date.value };
    const p2 = { name: compPerson2Name.value || 'Person 2', birthDate: compPerson2Date.value };

    const compResult = AgeComparison.compareAges(p1, p2, new Date());
    if (!compResult.valid) {
      showToast(compResult.error, 'error');
      return;
    }

    compVerdictTitle.textContent = compResult.verdictTitle;
    compVerdictDesc.textContent = compResult.verdictDesc;

    animateCounter(compDiffYears, compResult.yearsDiff, 600);
    animateCounter(compDiffMonths, compResult.monthsDiff, 600);
    animateCounter(compDiffDays, compResult.daysDiff, 600);

    animateCounter(compTotalDays, compResult.totalDaysDiff, 800, true);
    animateCounter(compTotalHours, compResult.totalHoursDiff, 800, true);
    animateCounter(compWeekendsDiff, compResult.weekendsDiff, 800, true);

    compResultsPanel.classList.add('active');
    showToast('Age comparison calculated!', 'success');
  });

  // ========================================================================
  // 14. Action Toolbar Handlers (Share, Copy, Print, Reset)
  // ========================================================================
  btnResetCalc.addEventListener('click', () => {
    birthDateInput.value = '';
    birthTimeInput.value = '';
    targetDateInput.value = '';
    clearDateBtn.classList.remove('visible');
    resultsContainer.style.display = 'none';
    currentBirthDate = null;
    if (activeTickerInterval) clearInterval(activeTickerInterval);
    showToast('Calculator cleared.', 'info');
  });

  btnCopyResult.addEventListener('click', () => {
    if (!currentBirthDate) {
      showToast('Please calculate your age first.', 'warning');
      return;
    }
    const age = AgeCalculator.calculateExactAge(currentBirthDate, currentTargetDate || new Date());
    const bday = BirthdayCountdown.getNextBirthdayInfo(currentBirthDate, new Date());

    const summaryText = `✨ ChronoAge Report ✨\n` +
      `📅 Born: ${currentBirthDate.toDateString()}\n` +
      `⏳ Exact Age: ${age.years} Years, ${age.months} Months, ${age.days} Days\n` +
      `🗓️ Total Days Lived: ${LifeStatistics.formatNumber(age.totalUnits.totalDays)} Days\n` +
      `🎂 Next Birthday: ${bday.formattedDate} (in ${bday.days} days)\n` +
      `✨ Calculated on ChronoAge`;

    navigator.clipboard.writeText(summaryText)
      .then(() => showToast('Age summary copied to clipboard!', 'success'))
      .catch(() => showToast('Failed to copy to clipboard.', 'error'));
  });

  btnShareResult.addEventListener('click', () => {
    if (!currentBirthDate) {
      showToast('Please calculate your age first.', 'warning');
      return;
    }
    const age = AgeCalculator.calculateExactAge(currentBirthDate, currentTargetDate || new Date());
    const shareData = {
      title: 'My ChronoAge Life Timeline',
      text: `I am ${age.years} Years, ${age.months} Months, and ${age.days} Days old! Calculated with ChronoAge.`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      btnCopyResult.click();
    }
  });

  btnPrintReport.addEventListener('click', () => {
    if (!currentBirthDate) {
      showToast('Please calculate your age first.', 'warning');
      return;
    }
    window.print();
  });

  // ========================================================================
  // 15. Saved Profiles & History Modal
  // ========================================================================
  const updateProfilesBadge = () => {
    const profiles = StorageManager.getProfiles();
    profilesCountBadge.textContent = profiles.length;
  };

  const renderProfilesList = () => {
    const profiles = StorageManager.getProfiles();
    updateProfilesBadge();
    savedProfilesList.innerHTML = '';

    if (profiles.length === 0) {
      savedProfilesList.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No saved profiles yet. Add one below!</div>`;
      return;
    }

    profiles.forEach(p => {
      const row = document.createElement('div');
      row.className = 'profile-item-row';
      row.innerHTML = `
        <div class="profile-info">
          <div class="person-avatar-icon avatar-p1"><i class="fa-solid fa-user"></i></div>
          <div>
            <div style="font-weight: 700;">${p.name} <span class="profile-tag-pill">${p.relation || 'Self'}</span></div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${p.birthDate}</div>
          </div>
        </div>
        <div class="profile-actions">
          <button class="quick-chip load-profile-btn" data-dob="${p.birthDate}" title="Load into Calculator">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Load
          </button>
          <button class="quick-chip delete-profile-btn" data-id="${p.id}" style="color: var(--rose-500);" title="Delete Profile">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `;
      savedProfilesList.appendChild(row);
    });

    // Attach listeners
    savedProfilesList.querySelectorAll('.load-profile-btn').forEach(b => {
      b.addEventListener('click', () => {
        birthDateInput.value = b.dataset.dob;
        clearDateBtn.classList.add('visible');
        executeCalculation();
        closeModal();
      });
    });

    savedProfilesList.querySelectorAll('.delete-profile-btn').forEach(b => {
      b.addEventListener('click', () => {
        StorageManager.deleteProfile(b.dataset.id);
        renderProfilesList();
        showToast('Profile deleted.', 'info');
      });
    });
  };

  const renderHistoryList = () => {
    const history = StorageManager.getHistory();
    historyList.innerHTML = '';
    if (history.length === 0) {
      historyList.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 1rem;">No recent calculations.</div>`;
      return;
    }

    history.forEach(h => {
      const row = document.createElement('div');
      row.className = 'profile-item-row';
      row.innerHTML = `
        <div>
          <div style="font-weight: 600; font-size: 0.9rem;">DOB: ${h.birthDate}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">${h.ageSummary || ''}</div>
        </div>
        <button class="quick-chip load-history-btn" data-dob="${h.birthDate}">
          <i class="fa-solid fa-rotate-right"></i> Load
        </button>
      `;
      historyList.appendChild(row);
    });

    historyList.querySelectorAll('.load-history-btn').forEach(b => {
      b.addEventListener('click', () => {
        birthDateInput.value = b.dataset.dob;
        clearDateBtn.classList.add('visible');
        executeCalculation();
        closeModal();
      });
    });
  };

  const openModal = () => {
    renderProfilesList();
    renderHistoryList();
    profilesModal.classList.add('active');
  };

  const closeModal = () => {
    profilesModal.classList.remove('active');
  };

  btnOpenProfiles.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);
  profilesModal.addEventListener('click', (e) => {
    if (e.target === profilesModal) closeModal();
  });

  // Save current as profile button in calculator
  btnSaveCurrentProfile.addEventListener('click', () => {
    if (!birthDateInput.value) {
      showToast('Please enter a birth date first.', 'warning');
      return;
    }
    openModal();
    newProfileName.focus();
  });

  saveProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = newProfileName.value.trim();
    const tag = newProfileTag.value;
    const dob = birthDateInput.value;

    if (!dob) {
      showToast('Please pick a birth date in the calculator first.', 'warning');
      return;
    }

    if (!name) {
      showToast('Please enter a profile name.', 'warning');
      return;
    }

    const newProfile = {
      id: 'prof_' + Date.now(),
      name,
      relation: tag,
      birthDate: dob,
      birthTime: birthTimeInput.value || '00:00'
    };

    StorageManager.saveProfile(newProfile);
    newProfileName.value = '';
    renderProfilesList();
    showToast(`Profile "${name}" saved!`, 'success');
  });

  // ========================================================================
  // 16. Form Controls & Quick Selectors
  // ========================================================================
  birthDateInput.addEventListener('input', () => {
    clearDateBtn.classList.toggle('visible', !!birthDateInput.value);
    if (birthDateInput.value) {
      executeCalculation(true);
    }
  });

  clearDateBtn.addEventListener('click', () => {
    birthDateInput.value = '';
    clearDateBtn.classList.remove('visible');
    resultsContainer.style.display = 'none';
    if (activeTickerInterval) clearInterval(activeTickerInterval);
  });

  toggleAdvancedBtn.addEventListener('click', () => {
    advancedOptionsPanel.classList.toggle('open');
    const isOpen = advancedOptionsPanel.classList.contains('open');
    toggleAdvancedBtn.innerHTML = isOpen 
      ? '<i class="fa-solid fa-chevron-up"></i> Hide Advanced Options' 
      : '<i class="fa-solid fa-sliders"></i> Advanced Options (Birth Time & Target Date)';
  });

  // Quick Chips (e.g. 18 years ago, 21 years ago, 30 years ago)
  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const yearsAgo = parseInt(chip.dataset.years, 10);
      const targetYear = new Date().getFullYear() - yearsAgo;
      // Use middle of year or today's month/day
      const today = new Date();
      const m = String(today.getMonth() + 1).padStart(2, '0');
      const d = String(today.getDate()).padStart(2, '0');
      birthDateInput.value = `${targetYear}-${m}-${d}`;
      clearDateBtn.classList.add('visible');
      executeCalculation();
    });
  });

  btnCalculate.addEventListener('click', () => {
    executeCalculation();
  });

  // Celebrate button on birthday banner
  btnCelebrate.addEventListener('click', () => {
    triggerConfetti();
    showToast('🎉 Happy Birthday! Wishing you a marvelous year ahead!', 'success');
  });

  // ========================================================================
  // 17. Lightweight Canvas Confetti Engine
  // ========================================================================
  const triggerConfetti = () => {
    if (!confettiCanvas) return;
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.7) * 20,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        opacity: 1
      });
    }

    let animationFrame;
    const render = () => {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45; // gravity
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.009;

        if (p.opacity > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      if (alive) {
        animationFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        cancelAnimationFrame(animationFrame);
      }
    };

    render();
  };

  // Initial badge update
  updateProfilesBadge();

  // Set default sample date of birth if user arrives for the first time
  // e.g. 2000-01-15 for instant gratification, or let them pick
  const history = StorageManager.getHistory();
  if (history.length > 0) {
    birthDateInput.value = history[0].birthDate;
    clearDateBtn.classList.add('visible');
    executeCalculation(true);
  } else {
    // Default to an interesting date (e.g. 2000-01-01) so dashboard is lively on first view!
    birthDateInput.value = '2000-01-01';
    clearDateBtn.classList.add('visible');
    executeCalculation(true);
  }
});

