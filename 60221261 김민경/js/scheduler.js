//캘린더
document.addEventListener("DOMContentLoaded", function () {
  // Calendar 초기화
  const calendar = new tui.Calendar("#calendar", {
    defaultView: "month",
    useDetailPopup: true,
    useCreationPopup: false,
  });

  let allEvents = [];

  // 샘플 일정 데이터 추가
  const sampleEvents = [
    {
      id: "1",
      calendarId: "1",
      title: "Guitar Practice - Tik Tak Tok",
      category: "time",
      start: "2024-11-01T10:00:00",
      end: "2024-11-01T12:00:00",
      isAllDay: false,
      attendees: ["John"],
    },
    {
      id: "2",
      calendarId: "1",
      title: "Drums Practice - Tik Tak Tok",
      category: "time",
      start: "2024-11-02T14:00:00",
      end: "2024-11-02T16:00:00",
      isAllDay: false,
      attendees: ["Alice"],
    },
    {
      id: "3",
      calendarId: "1",
      title: "Bass Practice - city 404",
      category: "time",
      start: "2024-11-03T09:00:00",
      end: "2024-11-03T11:00:00",
      isAllDay: false,
      attendees: ["Jane"],
    },
    {
      id: "4",
      calendarId: "1",
      title: "Vocals Practice - city 404",
      category: "time",
      start: "2024-11-04T13:00:00",
      end: "2024-11-04T15:00:00",
      isAllDay: false,
      attendees: ["Mike"],
    },
    {
      id: "5",
      calendarId: "1",
      title: "Guitar Practice - slow dancing in a burning room",
      category: "time",
      start: "2024-11-05T10:00:00",
      end: "2024-11-05T12:00:00",
      isAllDay: false,
      attendees: ["John"],
    },
    {
      id: "6",
      calendarId: "1",
      title: "Drums Practice - Tik Tak Tok",
      category: "time",
      start: "2024-11-06T14:00:00",
      end: "2024-11-06T16:00:00",
      isAllDay: false,
      attendees: ["Alice"],
    },
    {
      id: "7",
      calendarId: "1",
      title: "Bass Practice - slow dancing in a burning room",
      category: "time",
      start: "2024-11-07T09:00:00",
      end: "2024-11-07T11:00:00",
      isAllDay: false,
      attendees: ["John"],
    },
    {
      id: "8",
      calendarId: "1",
      title: "Vocals Practice - city 404",
      category: "time",
      start: "2024-11-08T13:00:00",
      end: "2024-11-08T15:00:00",
      isAllDay: false,
      attendees: ["Mike"],
    },
    {
      id: "9",
      calendarId: "1",
      title: "Guitar Practice - slow dancing in a burning room",
      category: "time",
      start: "2024-11-09T10:00:00",
      end: "2024-11-09T12:00:00",
      isAllDay: false,
      attendees: ["John"],
    },
    {
      id: "10",
      calendarId: "1",
      title: "Drums Practice - slow dancing in a burning room",
      category: "time",
      start: "2024-11-10T14:00:00",
      end: "2024-11-10T16:00:00",
      isAllDay: false,
      attendees: ["Alice"],
    },
  ];

  calendar.createEvents(sampleEvents);
  allEvents = sampleEvents;

  updatePracticeRanking();
  updateRehearsalRecommendation();
  updateSongFrequencyChart();

  // 모달 열기
  $("body").on("click", ".toastui-calendar-daygrid-cell", function () {
    const cellPosition = $(this).offset();

    $(".modal")
      .css({
        display: "none",
        top: cellPosition.top + 30 + "px",
        left: cellPosition.left + "px",
      })
      .slideDown();
  });

  // 모달 외부 클릭 시 모달 닫기
  $(document).mouseup(function (event) {
    const modal = $(".modal");
    if (!modal.is(event.target) && modal.has(event.target).length === 0) {
      modal.slideUp();
    }
  });

  // 버튼 클릭 시 저장
  $(".save-btn").on("click", function () {
    saveEvent();
    $(".modal").slideUp();
    updateRehearsalRecommendation();
    updatePracticeRanking();
    updateSongFrequencyChart();
  });

  // 저장
  function saveEvent() {
    const songName = $("#songName").val();
    const instrument = $("#instrument").val();
    const performer = $("#performer").val();
    const date = $("#Date").val();
    const startTime = $("#startTime").val();
    const endTime = $("#endTime").val();

    if (
      !songName ||
      !instrument ||
      !performer ||
      !date ||
      !startTime ||
      !endTime
    ) {
      alert("필수 입력 항목을 모두 입력해 주세요.");
      return;
    }

    const startDateTime = `${date}T${startTime}`;
    const endDateTime = `${date}T${endTime}`;

    const newEvent = {
      id: String(Math.random()),
      calendarId: "1",
      title: `${instrument} Practice - ${songName}`,
      category: "time",
      start: startDateTime,
      end: endDateTime,
      attendees: [performer],
    };

    calendar.createEvents([newEvent]);
    allEvents.push(newEvent); // 이벤트 저장
    calendar.render(); // 일정 추가 후 캘린더 새로고침
  }

  //연습량 차트 함수
  function updatePracticeRanking() {
    console.log("updatePracticeRanking 호출됨");
    const practiceHours = {
      Guitar: 0,
      Drums: 0,
      Bass: 0,
      Vocals: 0,
    };
    allEvents.forEach((event) => {
      const instrument = event.title.split(" ")[0];
      const duration =
        (new Date(event.end) - new Date(event.start)) / (1000 * 60 * 60);

      if (practiceHours[instrument] !== undefined) {
        practiceHours[instrument] += duration;
      }
    });
    //연습량 차트
    Highcharts.chart("practiceTimeChart", {
      chart: {
        type: "column",
        style: {
          fontFamily: "Holen",
        },
      },
      title: { text: "How much you practiced this week!" },
      xAxis: {
        categories: Object.keys(practiceHours),
      },
      yAxis: { min: 0, title: { text: "Hours Practiced" } },
      series: [
        {
          name: "Practice Hours",
          data: Object.values(practiceHours),
          colorByPoint: true,
          colors: ["#252525"],
        },
      ],
    });
  }

  // 곡 빈도 차트 함수
  function updateSongFrequencyChart() {
    console.log("updateSongFrequencyChart 호출됨");
    const songCount = {};
    const currentMonth = new Date().getMonth();

    allEvents.forEach((event) => {
      const eventMonth = new Date(event.start).getMonth();
      if (eventMonth === currentMonth) {
        const songName = event.title.split(" - ")[1]; //곡 제목 추출
        songCount[songName] = (songCount[songName] || 0) + 1;
      }
    });

    const totalPlays = Object.values(songCount).reduce((a, b) => a + b, 0);
    const chartData = Object.keys(songCount).map((song) => ({
      name: song,
      y: (songCount[song] / totalPlays) * 100,
    }));
    //곡 빈도 차트
    Highcharts.chart("songFrequencyChart", {
      chart: {
        type: "pie",
        style: {
          fontFamily: "Holen",
        },
      },
      title: { text: "What do you think we played the most?" },
      series: [
        {
          name: "Play percentage",
          data: chartData,
          colorByPoint: true,
          colors: ["#252525", "#717171", "#E8E8E8"],
        },
      ],
      plotOptions: {
        pie: {
          dataLabels: {
            format: "{point.name}: {point.y:.1f}%",
          },
        },
      },
    });
  }

  //합주 시간 추천
  function updateRehearsalRecommendation() {
    console.log("updateRehearsalRecommendation 호출됨");
    const popularDays = {};
    const popularTimes = {};

    allEvents.forEach((event) => {
      const day = new Date(event.start).toLocaleString("en-US", {
        weekday: "long",
      });
      const startTime = new Date(event.start).getHours();

      popularDays[day] = (popularDays[day] || 0) + 1;
      popularTimes[startTime] = (popularTimes[startTime] || 0) + 1;
    });
    console.log(popularDays, popularTimes); // Debugging line
    const recommendedDay = Object.keys(popularDays).reduce((a, b) =>
      popularDays[a] > popularDays[b] ? a : b
    );
    const recommendedTime = Object.keys(popularTimes).reduce((a, b) =>
      popularTimes[a] > popularTimes[b] ? a : b
    );

    var recommendationText = `Get to rehearsal on\n${recommendedDay} at ${recommendedTime}:00, you punks!`;

    document.getElementById("recommendedDayTime").innerText =
      recommendationText;
  }

  document.querySelector(".back-icon").addEventListener("click", function () {
    window.location.href = "index.html";
  });
});
