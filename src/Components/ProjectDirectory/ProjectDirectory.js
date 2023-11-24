import React, { useEffect, useState } from 'react';
import ProjectSummary from './ProjectSummary';
import { projects } from '../../Config/projects'
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_ACTIVE_PROJECT } from "../../Redux/actions";
import "./ProjectDirectory.css"
import $ from "jquery"
import _ from "lodash"
import {useMediaQuery} from "react-responsive";

const projectCategories = ["ALL", "research", "A_V", "WEB"]

function ProjectDirectory(props) {

    const dispatch = useDispatch()
    const active_project_id = useSelector(state => state.active_project);
    const route_to_project = useSelector(state => state.route_to_project);
    const [projectCategory, setProjectCategory] = useState('ALL');
    const isMobile = useMediaQuery({ maxWidth: 767 })


    useEffect( () => {
        if(route_to_project !== null) {
            projectSelectAnimation(route_to_project)
        }
        }, [route_to_project]
    )

    useEffect(() => {
        $(".Project-Wrapper").fadeIn(500)
        return function cleanup() { 
            dispatch({type: CHANGE_ACTIVE_PROJECT, project: null})};
    }, [])

    useEffect( () => {
        projectCategories.forEach(cat => {
                if (projectCategory.includes(cat)) {
                    $("#" + cat).addClass("Selected")
                }
                else {
                        $("#"+cat).removeClass("Selected")
                    }
            })
        }, [projectCategory]
    )


    const project_list = projects.map(function(p) {
        if(projectCategory === "ALL" || p.tags.includes(projectCategory)) {
            return (
                <div key={p.id} id={p.id} className={"Project-Link Project-Link" + p.id}
                     onClick={(e) => onFileClick(p.id)}>
                    <div key={p.title} id={"Project-Title" + p.id}
                         className={(p.coming_soon) ? "Inactive-Project-Title" : "Project-Title"}>{p.title.toUpperCase()}</div>
                    {/* <div key={p.title + "_desc"} id={"Project-Description" + p.id}
                         className={"Project-Description"}>{p.description}
                    </div> */}
                    {
                    (p.thumbnail_url) &&
                    <div style={{position: "relative"}}>
                        <div className="project_thumbnail" style={{
                            backgroundImage: "url(/"+p.project_path + p.thumbnail_url+")",
                            }}>
                        </div>
                        {
                        (p.coming_soon) &&
                        <div className="project_thumbnail_overlay">
                        </div>
        }
                    </div>
                    
                    }
                </div>
            );
        }
        else {
            return ""
        }
        });

    return (
        <div style={{position: "relative", height: "100%"}}>
            <div className={"Project-Directory-Wrapper"}>
                <ProjectDir/>
            </div>
            <div className={"Project-Summary-Wrapper"}>
                <ProjectSummary
                    animateBackToMenu={animateBackToMenu}
                />
            </div>
        </div>
    );

    function ProjectDir() {
        return(
            <div className={"Project-Wrapper"}>
                <div className={"Project-Header"}>
                    <div className={"Project-Menu"}>
                        <div id={'ALL'} onClick={() => setProjectCategory("ALL")} className={"Selected"}>All</div>
                        <div id={'research'} onClick={() => setProjectCategory("research")}>Research</div>
                        <div id={'A_V'}  onClick={() => setProjectCategory("A_V")}>A/V</div>
                        <div id={'WEB'}  onClick={() => setProjectCategory("WEB")}>Web</div>
                    </div>
                </div>
                {/* <hr class="rounded"></hr> */}
                <div className={"Project-Directory-Content"}>{
                    project_list}
                </div>
            </div>
        );
    }


    function onFileClick(id) {
        if(active_project_id === null) {
            projectSelectAnimation(id)
        }
    }

    // Move to Project Summary
    function animateBackToMenu() {
        // let project = _.find(projects, function(p) { return p.id === active_project_id; });
        dispatch({type: CHANGE_ACTIVE_PROJECT, project: null})
        $(".Project-Summary-Wrapper").hide(100);
        $(".Project-Directory-Wrapper").show(1000);
        $(".Window-projects").css("height", "100%");
    }

    function projectSelectAnimation(p) {
        $(".Project-Directory-Wrapper").hide(1000);
        $(".Project-Summary-Wrapper").show(1000);
        dispatch({type: CHANGE_ACTIVE_PROJECT, project: p})
        }
}

export default ProjectDirectory;