$(document).ready(function() {
    //Adding new control
    $("#morelink").click(function() {
        $('#controlcontent').append(getControlContent());
    });

    //Adding new Process
    $(document).on('click', "#addprocess" , function() {
       $(this).parent().append(addProcess());
    });

    //Delete Process
    $(document).on('click', "#deleteProcess" , function() {
        $(this).parent().parent().remove();
    });

    //Delete Control
    $(document).on('click', "#deleteControl" , function() {
        $(this).parent().parent().remove();
    });

    


});

//Getting content for control
function getControlContent() {
    var newHTML = [];
    newHTML.push('<div class="col-sm-12" >');
    newHTML.push('<div class="col-sm-4 control-content">');
    newHTML.push('<div class="form-group col-sm-4"><input class="form-control" id="name" placeholder="Control Name"></div>');
    newHTML.push('<div class="form-group col-sm-4"><input class="form-control" id="description" placeholder="Control Desc"></div>');
    newHTML.push('<div class="form-group col-sm-4"><textarea class="form-control" id="formControlTextarea1" placeholder="Control SQL" rows="3"></textarea></div>');
    newHTML.push('</div>');
    newHTML.push('<div class="form-group col-sm-8 control-button"><button type="button" class="btn btn-danger btn-sm" id="deleteControl">Delete</button>&nbsp;&nbsp;<button type="button" class="btn btn-primary btn-sm" id="addprocess">+ Process</button></div>');
    newHTML.push('</div>');
    return newHTML.join("");
}

//Getting content for new process
function addProcess() {
    var newHTML = [];  
    newHTML.push('<div id="process" class="col-sm-10 process-content">');  
    newHTML.push('<div class="form-group col-sm-3"><input class="form-control" id="name" placeholder="Process Name"></div>');
    newHTML.push('<div class="form-group col-sm-3"><input class="form-control" id="description" placeholder="Process Desc"></div>');
    newHTML.push('<div class="form-group col-sm-3"><textarea class="form-control" id="formControlTextarea1" placeholder="Process SQL" rows="3"></textarea></div>');
    newHTML.push('<div class="form-group col-sm-3"><button type="button" class="btn btn-danger btn-sm" id="deleteProcess">Delete</button>&nbsp;&nbsp;<button type="button" class="btn btn-success btn-sm">Run</button></div>');
    newHTML.push('</div');
    return newHTML.join("");
}
