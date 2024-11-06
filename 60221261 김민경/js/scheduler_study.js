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
      title: "Programming Study - Individual",
      category: "time",
      start: "2024-11-01T10:00:00",
      end: "2024-11-01T12:00:00",
      attendees: ["Liam"],
    },
    {
      id: "2",
      calendarId: "1",
      title: "UI Study - Group",
      category: "time",
      start: "2024-11-01T14:00:00",
      end: "2024-11-01T15:30:00",
      attendees: ["Emma", "Noah"],
    },
    {
      id: "3",
      calendarId: "1",
      title: "Programming Study - Group",
      category: "time",
      start: "2024-11-02T09:00:00",
      end: "2024-11-02T11:00:00",
      attendees: ["Ava", "Olivia"],
    },
    {
      id: "4",
      calendarId: "1",
      title: "Article Study - Individual",
      category: "time",
      start: "2024-11-03T13:00:00",
      end: "2024-11-03T15:30:00",
      attendees: ["Liam"],
    },
    {
      id: "5",
      calendarId: "1",
      title: "Programming Study - Individual",
      category: "time",
      start: "2024-11-05T08:00:00",
      end: "2024-11-05T10:00:00",
      attendees: ["Emma"],
    },
    {
      id: "6",
      calendarId: "1",
      title: "UX Study - Group",
      category: "time",
      start: "2024-11-05T11:00:00",
      end: "2024-11-05T12:30:00",
      attendees: ["Noah", "Olivia"],
    },
    {
      id: "7",
      calendarId: "1",
      title: "Programming Study - Individual",
      category: "time",
      start: "2024-11-06T13:00:00",
      end: "2024-11-06T17:30:00",
      attendees: ["Liam"],
    },
    {
      id: "8",
      calendarId: "1",
      title: "Programming Study - Group",
      category: "time",
      start: "2024-11-08T11:00:00",
      end: "2024-11-08T13:15:00",
      attendees: ["Ava", "Emma"],
    },
    {
      id: "9",
      calendarId: "1",
      title: "Article Study - Individual",
      category: "time",
      start: "2024-11-08T14:00:00",
      end: "2024-11-08T15:30:00",
      attendees: ["Noah"],
    },
    {
      id: "10",
      calendarId: "1",
      title: "Programming Study - Individual",
      category: "time",
      start: "2024-11-09T08:00:00",
      end: "2024-11-09T10:00:00",
      attendees: ["Olivia"],
    },
    {
      id: "11",
      calendarId: "1",
      title: "UI Study - Group",
      category: "time",
      start: "2024-11-10T10:30:00",
      end: "2024-11-10T12:00:00",
      attendees: ["Liam", "Emma"],
    },
    {
      id: "12",
      calendarId: "1",
      title: "Programming Study - Group",
      category: "time",
      start: "2024-11-12T14:00:00",
      end: "2024-11-12T16:00:00",
      attendees: ["Ava", "Noah"],
    },
    {
      id: "13",
      calendarId: "1",
      title: "Programming Study - Individual",
      category: "time",
      start: "2024-11-13T09:00:00",
      end: "2024-11-13T11:00:00",
      attendees: ["Emma"],
    },
    {
      id: "14",
      calendarId: "1",
      title: "Article Study - Group",
      category: "time",
      start: "2024-11-13T13:00:00",
      end: "2024-11-13T14:30:00",
      attendees: ["Liam", "Olivia"],
    },
    {
      id: "15",
      calendarId: "1",
      title: "Programming Study - Individual",
      category: "time",
      start: "2024-11-14T08:00:00",
      end: "2024-11-14T09:30:00",
      attendees: ["Noah"],
    },
    {
      id: "16",
      calendarId: "1",
      title: "Programming Study - Group",
      category: "time",
      start: "2024-11-15T11:00:00",
      end: "2024-11-15T13:00:00",
      attendees: ["Emma", "Ava"],
    },
    {
      id: "17",
      calendarId: "1",
      title: "Programming Study - Individual",
      category: "time",
      start: "2024-11-17T09:00:00",
      end: "2024-11-17T10:30:00",
      attendees: ["Liam"],
    },
    {
      id: "18",
      calendarId: "1",
      title: "Programming Study - Individual",
      category: "time",
      start: "2024-11-18T14:00:00",
      end: "2024-11-18T15:30:00",
      attendees: ["Olivia"],
    },
    {
      id: "19",
      calendarId: "1",
      title: "UX Study - Group",
      category: "time",
      start: "2024-11-18T15:30:00",
      end: "2024-11-18T17:00:00",
      attendees: ["Liam", "Emma"],
    },
    {
      id: "20",
      calendarId: "1",
      title: "Programming Study - Individual",
      category: "time",
      start: "2024-11-20T08:00:00",
      end: "2024-11-20T09:30:00",
      attendees: ["Ava"],
    },
    {
      id: "21",
      calendarId: "1",
      title: "UI Study - Group",
      category: "time",
      start: "2024-11-20T13:00:00",
      end: "2024-11-20T14:30:00",
      attendees: ["Noah", "Emma"],
    },
    {
      id: "22",
      calendarId: "1",
      title: "Programming Study - Individual",
      category: "time",
      start: "2024-11-22T11:00:00",
      end: "2024-11-22T12:00:00",
      attendees: ["Olivia"],
    },
    {
      id: "23",
      calendarId: "1",
      title: "Programming Study - Group",
      category: "time",
      start: "2024-11-25T09:00:00",
      end: "2024-11-25T11:00:00",
      attendees: ["Liam", "Noah"],
    },
    {
      id: "24",
      calendarId: "1",
      title: "Article Study - Individual",
      category: "time",
      start: "2024-11-27T13:00:00",
      end: "2024-11-27T15:00:00",
      attendees: ["Emma"],
    },
    {
      id: "25",
      calendarId: "1",
      title: "Programming Study - Individual",
      category: "time",
      start: "2024-11-29T08:00:00",
      end: "2024-11-29T10:30:00",
      attendees: ["Liam"],
    },
    {
      id: "26",
      calendarId: "1",
      title: "UI Study - Group",
      category: "time",
      start: "2024-11-30T14:00:00",
      end: "2024-11-30T15:30:00",
      attendees: ["Noah", "Emma"],
    },
  ];

  calendar.createEvents(sampleEvents);
  allEvents = sampleEvents;

  updateStudyRanking();
  updateStudyRecommendation();
  updateSubjectFrequencyChart();

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
    updateStudyRecommendation();
    updateStudyRanking();
    updateSubjectFrequencyChart();
  });

  // 저장
  function saveEvent() {
    const participationTypes = $("#participationTypes").val();
    const subject = $("#subject").val();
    const attendees = $("#attendees").val();
    const date = $("#Date").val();
    const startTime = $("#startTime").val();
    const endTime = $("#endTime").val();

    if (!subject || !date || !startTime || !endTime) {
      alert("필수 입력 항목을 모두 입력해 주세요.");
      return;
    }

    const startDateTime = `${date}T${startTime}`;
    const endDateTime = `${date}T${endTime}`;

    const newEvent = {
      id: String(Math.random()),
      calendarId: "1",
      title: `${subject} Study - ${participationTypes}`,
      category: "time",
      start: startDateTime,
      end: endDateTime,
      attendees: [attendees],
    };

    calendar.createEvents([newEvent]);
    allEvents.push(newEvent); // 이벤트 저장
    calendar.render(); // 일정 추가 후 캘린더 새로고침
  }

  //공부량 차트 함수
  function updateStudyRanking() {
    console.log("updateStudyRanking 호출됨");

    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDay); // 이번 주 시작일
    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const studyHours = {};

    allEvents.forEach((event) => {
      const eventDate = new Date(event.start);

      if (eventDate >= startOfWeek && eventDate <= endOfWeek) {
        const duration =
          (new Date(event.end) - new Date(event.start)) / (1000 * 60 * 60);
        // 참여자 별 누적 시간
        event.attendees.forEach((attendee) => {
          if (studyHours[attendee] !== undefined) {
            studyHours[attendee] += duration;
          } else {
            studyHours[attendee] = duration;
          }
        });
      }
    });
    //공부량 차트
    Highcharts.chart("studyTimeChart", {
      chart: {
        type: "column",
        style: {
          fontFamily: "Holen",
        },
      },
      title: { text: "How much you studied this week!" },
      xAxis: {
        categories: Object.keys(studyHours),
      },
      yAxis: { min: 0, title: { text: "Hours studied" } },
      series: [
        {
          name: "Study Hours",
          data: Object.values(studyHours),
          colorByPoint: true,
          colors: ["#252525"],
        },
      ],
    });
  }

  // 과목 차트 함수
  function updateSubjectFrequencyChart() {
    console.log("updateSubjectFrequencyChart 호출됨");
    const subjectCount = {};
    const currentMonth = new Date().getMonth();

    allEvents.forEach((event) => {
      const eventMonth = new Date(event.start).getMonth();
      if (eventMonth === currentMonth) {
        const subjectName = event.title.split(" - ")[0]; // 과목명 추출
        subjectCount[subjectName] = (subjectCount[subjectName] || 0) + 1;
      }
    });

    const totalStudy = Object.values(subjectCount).reduce((a, b) => a + b, 0);
    const chartData = Object.keys(subjectCount).map((subject) => ({
      name: subject,
      y: (subjectCount[subject] / totalStudy) * 100,
    }));
    //과목 차트
    Highcharts.chart("subjectFrequencyChart", {
      chart: {
        type: "pie",
        style: {
          fontFamily: "Holen",
        },
      },
      title: { text: "What do you think we studied the most?" },
      series: [
        {
          name: "Study percentage",
          data: chartData,
          colorByPoint: true,
          colors: ["#252525", "#444444", "#717171", "#E8E8E8"],
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
  function updateStudyRecommendation() {
    console.log("updateStudyRecommendation 호출됨");
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

    var recommendationText = `Get to study on\n${recommendedDay} at ${recommendedTime}:00, you punks!`;

    document.getElementById("recommendedDayTime").innerText =
      recommendationText;
  }

  document.querySelector(".back-icon").addEventListener("click", function () {
    window.location.href = "index.html";
  });
});
