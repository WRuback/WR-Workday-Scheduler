var today = $("#currentDay");
var schedule = $("#scheduler");
var plans = "";

function init(){
    today.text(moment().format("MMMM Do, YYYY"));
    if(localStorage.getItem("plans") === null){
        localStorage.setItem("plans", JSON.stringify([
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ]));
    }
    plans = JSON.parse(localStorage.getItem("plans"));
    buildScheduler();
}

function buildRow(time, plan){
    let scheduleRow = $("<div>");
    scheduleRow.addClass("row");

    let timeDisplay = $("<p>");
    timeDisplay.addClass("col-2 hour text-right p-2");
    timeDisplay.text(time.format("hA"));
    scheduleRow.append(timeDisplay);

    let planInput = $("<textarea>");
    planInput.addClass("col-8 future");
    planInput.text(plan);
    scheduleRow.append(planInput);

    let saveButton = $("<button>");
    saveButton.addClass("col-2 btn saveBtn");
    saveButton.append("<i>").addClass("fa fa-floppy-o fa-3x");
    scheduleRow.append(saveButton);

    schedule.append(scheduleRow);
}
function buildScheduler(){
    let hour = moment("8AM", "hA");
    for(let i =0;i<plans.length; i++){
        hour.add(1, "h");
        buildRow(hour, plans[i]);
    }
}

function savePlan(event){
    let planBox = $(event.target).siblings("textarea");
    plans[planBox.parent().index()] = planBox.val();
    localStorage.setItem("plans",JSON.stringify(plans));

}

init();
schedule.on("click", ".btn", savePlan);