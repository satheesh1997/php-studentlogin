var api_url = "http://localhost/new_login_api/";
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
    var user = getCookie("SKCT:Auth-User");
    var token = getCookie("SKCT:Auth-Token");
    for(i=1;i<number+1;i++){
        $("#sem"+i).html(markstemp);
        $.get(api_url+'marks.php?number='+user+'&semester='+i+'&token='+token)
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

function load_academics(){
    var user = getCookie("SKCT:Auth-User");
    var token = getCookie("SKCT:Auth-Token");
    $.get(api_url+'marks.php?number='+user+'&token='+token)
    .done(function(data){
        var total_sems = data.total_sems;
        load_sem(total_sems);
    });
}

load_academics();


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

$(document).ready(function() {
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