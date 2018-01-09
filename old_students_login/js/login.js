$(document).ready(function() {
    $('input').blur(function() {
        if ($(this).val())
            $(this).addClass('used');
        else
            $(this).removeClass('used');
    });
    $('#password').on('keydown', function(e) {
        if (e.which == 13) {
            e.preventDefault();
            $(".se-pre-con").fadeIn('slow');
            login_student();
            $(".se-pre-con").fadeOut('slow');
        }
    });
    $(".se-pre-con").fadeOut("slow");
    check_cookie();
    $('.panel').find('.panel-body').slideUp();
    $('.clickable').addClass('panel-collapsed');
    $('.clickable').find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
});

$(document).on('click', '.panel-heading span.clickable', function(e){
    var $this = $(this);
    if(!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    }
})


$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        $(".se-pre-con").fadeIn("slow");
        reset();
        $(".se-pre-con").fadeOut("slow");
    }
});


function login_student() {
    $("#submit").html("Logging in...");
    disable_btns();
    var roll = $("#number").val();
    var pass = $("#password").val();
    if (roll == null || roll == "") {
        document.getElementById("number").style.borderBottom = "1px solid red";
        enable_btns();
        $("#submit").html("LOGIN");
        return false;
    }
    if (pass == null || pass == "") {
        document.getElementById("password").style.borderBottom = "1px solid red";
        enable_btns();
        $("#submit").html("LOGIN");
        return false;
    }
    var lrequest = new XMLHttpRequest();
    lrequest.onreadystatechange = function() {
        if (lrequest.readyState == 4) {
            if (lrequest.status == 200) {
                var data_1 = lrequest.responseText;
                console.log(data_1);
                var reply = JSON.parse(data_1);
                if (reply.status == "success") {
                    setCookie("skct_student_id", reply.student_id, 30);
                    setCookie("skct_student_logged", "true", 30);
                    $.notify("Login Successful :)","success");
                    window.location="./profile.html"
                } else {
                    $.notify(reply.msg,"error");
                }
                enable_btns();
                $("#submit").html("LOGIN");
            } else {
                console.log(lrequest.status + "Status Received :(");
            }
        }
    }
    lrequest.open('GET', "./php/login.php?roll=" + roll + "&pass=" + pass, true);
    lrequest.send(null)
}

function signup(){
    disable_btns();
    $("#register_btn").html("Registering...");
    var roll = $("#number").val();
    var pass = $("#password").val();
    if (roll == null || roll == "" || pass == null || pass == "") {
        $.notify("Read Our Terms And Conditions Before Registering Here!","info");
        $("#register_btn").html("SIGN UP");
        window.location="./register.html";
        return false;
    }
    var lrequest = new XMLHttpRequest();
    lrequest.onreadystatechange = function() {
        if (lrequest.readyState == 4) {
            if (lrequest.status == 200) {
                var data_1 = lrequest.responseText;
                console.log(data_1);
                var reply = JSON.parse(data_1);
                if (reply.can_login == true) {
                    document.getElementById("submit").disabled = false;
                    $("#register_btn").html("SIGN UP");
                    document.getElementById("register_btn").disabled=true;
                    $.notify("Try Login!","info");
                    $.notify("You are already registered on the server!","warn");
                    return;
                }else if(reply.can_login == false){
                    //change The Page To Register Page
                    $.notify("Read Our Terms And Conditions Before Registering Here!","info");
                    window.location="./register.html?id="+roll;
                } else {
                    alert("Use The Correct Login Details :(");
                }
                enable_btns();
                $("#register_btn").html("SIGN UP");
            } else {
                console.log(lrequest.status + "Status Received :(");
            }
        }
    }
    lrequest.open('GET', "./php/register.php?roll=" + roll + "&pass=" + pass, true);
    lrequest.send(null)
}

function reset() {
    $("#number").val("");
    $("#password").val("");
}

function disable_btns() {
    document.getElementById("submit").disabled = true;
    document.getElementById("register_btn").disabled=true;
}

function enable_btns() {
    document.getElementById("submit").disabled = false;
    document.getElementById("register_btn").disabled=false;
}


function registration(){
    return{
        set_details:function(id){
            $.get('./php/details.php?details='+id)
            .done(function(data){
                if(data != null){
                    $("#register_btn_1").css("display","");
                    $("#help_btn").css("display","none");
                }
                else{
                    $("#register_btn_1").css("display","none");
                    $("#help_btn").css("display","");  
                }
                $("#number").val(data.A);
                $("#name").val(data.B);
                $("#reg_course").html(data.C);
                $("#reg_gender").html(data.D);
                $("#reg_dob").html(data.E);
                $("#reg_blood").html(data.F);
                $("#reg_address").html(data.J);
            });
        },
        pro_set_details:function(id){
            $.get('./php/details.php?details='+id)
            .done(function(data){
                console.log(data);
                $("#title").html(data.B);
                $("#pic").attr('src',"http://app1.skct.edu.in:808/tutor/photo/"+data.A+".jpg");
                $("#pic").attr('alt',data.B+ " check your network connection..");
                $("#pname").append(data.B);
                $("#pemail").append(data.M);
                $("#pcourse").append(data.C);
                $("#pgender").append(data.D);
                $("#pdob").append(data.E);
                $("#pparent").append(data.I);
                $("#pnum").append(data.K);
                $("#psnum").append(data.L);
                $("#prel").append(data.G);
                $("#pcaste").append(data.H);
                $("#pblood").append(data.F);
                $("#paddress").append(data.J);
            });
        },
        register:function(number,password){
            $.post("./php/register.php",{ number:number, password:password})
            .done(function(data){
                if(data.status == 'success'){
                    window.location="./index.html";
                }
                else{
                    $.notify("Error While Registering........");
                    $.notify(data.status);
                }
            });
        }
    }
}
var a = registration();



$("#number").keyup(function(){
    a.set_details($("#number").val());   
});

$("#confirmpassword").keyup(function(){
    var password = $("#password").val();
    var confirmpassword = $("#confirmpassword").val();
    if(password == confirmpassword && password.length > 4 && confirmpassword.length > 4){
        $("#register_btn_1").removeAttr('disabled');
    }
    else{
        $("#register_btn_1").attr('disabled','disabled');
    }
});

$("#register_btn_1").click(function(){
    var number = $("#number").val();
    var password = $("#password").val();
    var cpass = $("#confirmpassword").val();
    if(password == cpass){
        a.register(number,password);
    }
    else{
        $.notify("Passwords Donot Match");
    }
});

var is_logged = getCookie('skct_student_id');

if(is_logged.length > 4 && page == 0){
    window.location="./profile.html";
}

if(page == 1 || page == 2){
    if(is_logged <4){
      window.location="./index.html";  
    }
    else{
        a.pro_set_details(is_logged);
        console.log("Logged In..");
    }
}
else{
    a.set_details(is_logged);
}
document.write("");

var markstemp = '<tr>\
                    <td>SUBJECT I</td>\
                    <td id="mark1" style="font-family:sans-serif;">--</td>\
                    <td id="grade1" style="font-family:sans-serif;">--</td>\
                    <td id="remark1" style="font-family:sans-serif;">GOOD</td>\
                </tr>\
                <tr>\
                    <td>SUBJECT II</td>\
                    <td id="mark2" style="font-family:sans-serif;">--</td>\
                    <td id="grade2" style="font-family:sans-serif;">--</td>\
                    <td id="remark2" style="font-family:sans-serif;">GOOD</td>\
                </tr>\
                <tr>\
                    <td>SUBJECT III</td>\
                    <td id="mark3" style="font-family:sans-serif;">--</td>\
                    <td id="grade3" style="font-family:sans-serif;">--</td>\
                    <td id="remark3" style="font-family:sans-serif;">GOOD</td>\
                </tr>\
                <tr>\
                    <td>SUBJECT IV</td>\
                    <td id="mark4" style="font-family:sans-serif;">--</td>\
                    <td id="grade4" style="font-family:sans-serif;">--</td>\
                    <td id="remark4" style="font-family:sans-serif;">GOOD</td>\
                </tr>\
                <tr>\
                    <td>SUBJECT V</td>\
                    <td id="mark5" style="font-family:sans-serif;">--</td>\
                    <td id="grade5" style="font-family:sans-serif;">--</td>\
                    <td id="remark5" style="font-family:sans-serif;">GOOD</td>\
                </tr>\
                <tr>\
                    <td>SUBJECT VI</td>\
                    <td id="mark6" style="font-family:sans-serif;">--</td>\
                    <td id="grade6" style="font-family:sans-serif;">--</td>\
                    <td id="remark6" style="font-family:sans-serif;">GOOD</td>\
                </tr>\
                <tr><td><b>ATTENDANCE</b></td><td id="attend" style="font-family:sans-serif;"></td></tr>\
                <tr>\
                    <td><b>CGPA<b></td>\
                    <td id="cgpa" style="font-family:sans-serif;">--</td>\
                    <td><b>SGPA</b></td>\
                    <td id="sgpa" style="font-family:sans-serif;">----</td>\
                </tr>\
                ';

function load_sem(number){
    var student_id = getCookie('skct_student_id');
    for(i=1;i<number+1;i++){
        $("#sem"+i).html(markstemp);
        $.get('./php/academics.php?roll='+student_id+'&sem='+i)
        .done(function(data){
            var marks={
                "i" : data.sub_1,
                "ii" : data.sub_2,
                "iii" : data.sub_3,
                "iv" : data.sub_4,
                "v" : data.sub_5,
                "vi" : data.sub_6,
                "cgpa" : data.cgpa,
                "sgpa" : data.sgpa,
                "attend": data.attendence

            };
            load_mark(i-1,marks);
        });
    }
}

function load_mark(semester,marks){
    console.log(semester);
    $('#sem'+semester).find('#mark1').html(marks.i);
    console.log(marks);
    $('#sem'+semester).find('#grade1').html(grade(marks.i));
    $('#sem'+semester).find('#remark1').html(remark(marks.i));
    $('#sem'+semester).find('#mark2').html(marks.ii);
    $('#sem'+semester).find('#grade2').html(grade(marks.ii));
    $('#sem'+semester).find('#remark2').html(remark(marks.ii));
    $('#sem'+semester).find('#mark3').html(marks.iii);
    $('#sem'+semester).find('#grade3').html(grade(marks.iii));
    $('#sem'+semester).find('#remark3').html(remark(marks.iii));
    $('#sem'+semester).find('#mark4').html(marks.iv);
    $('#sem'+semester).find('#grade4').html(grade(marks.iv));
    $('#sem'+semester).find('#remark4').html(remark(marks.iv));
    $('#sem'+semester).find('#mark5').html(marks.v);
    $('#sem'+semester).find('#grade5').html(grade(marks.v));
    $('#sem'+semester).find('#remark5').html(remark(marks.v));
    if(marks.vi != null){
        $('#sem'+semester).find('#mark6').html(marks.vi);
        $('#sem'+semester).find('#grade6').html(grade(marks.vi));
        $('#sem'+semester).find('#remark6').html(remark(marks.vi));
    }
    else{
        $('#sem'+semester).find('#mark6').html("------");
    }
    $('#sem'+semester).find('#cgpa').html(marks.cgpa);
    $('#sem'+semester).find('#sgpa').html(marks.cgpa);
    $('#sem'+semester).find('#attend').html(marks.attend+"%");
}

function remark(mark){
    if(mark < 50){
        return "Meet Coe";
    }
    else{
        return "Good";
    }
}

function grade(mark){
    if(mark > 90){
        return "S";
    }
    else if(mark > 80){
        return "A";
    }
    else if(mark > 70){
        return "B";
    }
    else if(mark > 60){
        return "C";
    }
    else if(mark > 50){
        return "D";
    }
    else {
        return "RE";
    }
}

function load_academics(student_id){
    $.get('./php/academics.php?roll='+student_id+'&sems')
    .done(function(data){
        var total_sems = data.total_sems;
        load_sem(total_sems);
    });
}


setInterval(load_credit,1000);

function load_credit(){
    console.log(" ============================");
    console.log("|   Author : Satheesh kumar  |");
    console.log(" ============================");
    console.log("  ");
    console.log("This Console Is Only For Developers.");
    console.log("|              WARNING             |");
    console.log("Don't Use Items Shown Here In Url   ");
    console.log("If You Want To Be A Developer Here..");
    console.log("CONTACT ME:");
    console.log("----------");
    console.log("http://satheesh1997.ml");
    console.log("http://facebook.com/satheesh1997");
}