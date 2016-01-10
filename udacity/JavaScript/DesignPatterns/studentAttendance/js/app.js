/* STUDENT APPLICATION */
$(function() {
  var model = {
    init: function() {
      this.students = [
        "Slappy the Frog",
        "Lilly the Lizard",
        "Paulrus the Walrus",
        "Gregory the Goat",
        "Adam the Anaconda"
      ];

      // the number of days that should be tracked
      this.days = 12;

      // if no attendence then generate a random set
      if (!localStorage.attendance) {
        var attendance = this.generateAttendance(this.students);
        this.setAttendance( attendance );
      }
    },

    // this function takes an object of attenance data and saves it to localStorage
    setAttendance: function( attendance ) {
      localStorage.attendance = JSON.stringify( attendance );
    },

    // get the attendance from localStorage
    getAttendance: function() {
      return JSON.parse(localStorage.attendance);
    },

    // function generates some random attendance data for given students
    generateAttendance: function( students ) {
        var attendance = {};

        // loop through each student and generate attendance upto the number of days
        students.forEach(function(student) {
            attendance[student] = [];
            for (var i = 0; i < this.days; i++) {
                attendance[student].push(getRandom());
            }
        });

        return attendance;
    },

    // returns the days
    getDays: function() {
      return this.days;
    }

  }

  var view = {
    init: function() {
      // get the number of days, so we know how large the loop for drawing has to be
      this.dayCount = octopus.getDays();

      // create header element for Student Name
      var elem = document.createElement('TH');
      elem.className = "name-col";
      elem.textContent = "Student Name";

      // create header element  for the number of days
      $('#tblHeader').append(elem);
      for (var i = 1; i <= this.dayCount; i++) {
        var elem = document.createElement('TH');
        elem.textContent = i;
        $('#tblHeader').append(elem);
      }

      // create header element  for Days Missed-col
      var elem = document.createElement('TH');
      elem.className = "missed-col";
      elem.textContent = "Days Missed-col";

      // attach header element to table
      $('#tblHeader').append(elem);
    },

    // draws a students name, attendance and missed days
    drawStudent: function(student) {
      // create row for student
      var tr = document.createElement('TR');
      tr.className = "student";

      // create row element for student name
      var td = document.createElement('TD');
      td.className = "name-col";
      td.textContent = student.name;

      tr.appendChild(td);

      // loop through the number of days (student.attendance.length)
      // and draw checkbox
      for (var i = 0; i < student.attendance.length; i++) {
        // create element for checkbox
        var td = document.createElement('TD');
        td.classname = "attend-col";

        // create checkbox according to attendance
        var cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = student.attendance[i];

        // give the check box an event listener for clicks
        // each click on a checkbox will trigger an update
        cb.addEventListener('click', function() {
          octopus.update();
        });

        // attach the checkbox to the element then the elements to the row
        td.appendChild(cb);
        tr.appendChild(td);
      }

      // create element for the missed days
      var td = document.createElement('TD');
      td.className = "missed-col";
      td.textContent = student.missingCount;

      // attach the missed days column to the row
      tr.appendChild(td);

      // attach the row to the table
      $('#tblBody').append(tr);
    },

    render: function() {
      // clear out the old table
      $('#tblBody').empty();

      // for each student, draw their attendance
      this.attendance = octopus.getAttendance();
      for (var i = 0; i < this.attendance.length; i++) {
        this.drawStudent( this.attendance[i] )
      }
    }
  }

  var octopus = {
    init: function() {
      model.init();
      view.init();
      view.render();
    },

    // gets the attendance from the model, processes it for the view
    getAttendance: function() {
      var attendance = model.getAttendance();
      var processedAttendance = [];

      for (student in attendance) {
        processedAttendance.push({
          name: student,
          attendance: attendance[student],
          missingCount: this.countMissing(attendance[student])
        });
      }

      return processedAttendance;
    },

    // function to count the number of falses in an array
    countMissing: function( attendance ) {
      var count = 0;
      for (var i = 0; i < attendance.length; i++) {
        if (!attendance[i]) {
          count++
        }
      }
      return count;
    },

    getDays: function() {
      return model.getDays();
    },

    // function attached to each checkbox on view, updates the model
    // and redraws the view
    update: function() {
      // get students (current state of what has been checked)
      var students = $('#tblBody').children();
      var newAttendance = {};

      // loop that collects the checkbox state for each student
      for (var i = 0; i < students.length; i++) {
        var student = $(students[i]);
        var name = student.children('.name-col').text();
        var studentCheckboxes = $(student.children('td')).children('input');
        var studentAttendance = [];

        // for each studentRows checkboxes, collects the data
        for (var j = 0; j < studentCheckboxes.length; j++) {
          studentAttendance.push($(studentCheckboxes[j]).prop('checked'));
        }

        // add the new data to the object
        newAttendance[name] = studentAttendance;
      }

      // save new data into local storage
      model.setAttendance(newAttendance);

      // redraw the new data
      view.render();
    }
  }

  octopus.init();

  function getRandom() {
      return (Math.random() >= 0.5);
  }

}());
