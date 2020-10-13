import React, { useEffect } from "react";
import "../App.css"
import $ from "jquery"

function Monster() {

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        console.log("in effect on start up")
        setTimeout(function(){
            $( ".monster" ).animate({
                bottom: "-=" + String($(window).height()),
            }, 500, function() {

            });
            setTimeout(function () { blink() }, 3000)
            setTimeout(function () { headright() }, 6000)
            setTimeout(function () { squat() }, 10000)

            setTimeout(function(){$( ".monster" ).attr("src", "monster_fall.gif");}, 280)
            setTimeout(function(){$( ".monster" ).attr("src", "standing.png");}, 1000)
            setTimeout(function(){$( ".monster" ).css("bottom", "0px");}, 1000)

        }, 1000);
        $(document).keydown(function(e){
            console.log(e.which)
            switch (e.which){
                case 40:    //bottom arrow key
                    if($( ".monster" ).attr("src") !== "monster_fall.gif") {
                        $(".monster").attr("src", "monster_fall.gif");
                    }
                    break;
                default:
                    break;
            }
        });
        $(document).keyup(function(e){
            $( ".monster" ).attr("src", "standing.png");
        });
    }, []);

    function blink(){
        if($( ".monster" ).attr("src") === "standing.png") {
            $( ".monster" ).attr("src", "blink.gif");
            setTimeout(function(){ $( ".monster" ).attr("src", "standing.png");}, 600)
            let after = Math.floor(Math.random() * 6000) + 3000
            setTimeout(function(){blink()},  after);
        }
        else {
            let after = Math.floor(Math.random() * 6000) + 3000
            setTimeout(function(){blink()}, after);
        }
    }

    function headright(){
        if($( ".monster" ).attr("src") === "standing.png") {
            $( ".monster" ).attr("src", "turn_right.png");
            setTimeout(function(){ $( ".monster" ).attr("src", "standing.png");}, 2000)
            let after = Math.floor(Math.random() * 20000) + 10000
            setTimeout(function(){headright()}, after);
        }
        else {
            let after = Math.floor(Math.random() * 20000) + 10000
            setTimeout(function(){headright()}, after);
        }
    }

    function squat(){
        if($( ".monster" ).attr("src") === "standing.png") {
            $( ".monster" ).attr("src", "monster_fall.gif");
            setTimeout(function(){ $( ".monster" ).attr("src", "standing.png");}, 700)
            let after = Math.floor(Math.random() * 30000) + 20000
            setTimeout(function(){squat()}, after);
        }
        else {
            let after = Math.floor(Math.random() * 20000) + 20000
            setTimeout(function(){squat()}, after);
        }
    }

    return (
            <img alt={"monster-animation"} className="monster" src="standing.png"/>
        );

}

export default Monster;