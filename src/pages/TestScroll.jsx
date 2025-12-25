import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './TestScroll.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

const TestScroll = () => {
    
    
    useGSAP(() => {
        // gsap.to('.box', {
            //     scrollTrigger: '.box', // start the animation when ".box" enters the viewport (once)
            //     x: 1000
            // });
            
        // --- RED PANEL ---
        gsap.from(".line-1", {
            scrollTrigger: {
                trigger: ".line-1",
                scrub: true,
                start: "top bottom",
                end: "top top"
            },
            scaleX: 0,
            transformOrigin: "left center",
            ease: "none"
        });

        // --- ORANGE PANEL ---
        gsap.from(".line-2", {
            scrollTrigger: {
                trigger: ".orange",
                scrub: true,
                pin: true,
                start: "top top",
                end: "+=100%"
            },
            scaleX: 0,
            transformOrigin: "left center",
            ease: "none"
        });

        // --- GREEN PANEL ---
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".green",
                scrub: true,
                pin: true,
                start: "top top",
                end: "+=100%"
            }
        });

        tl.from(
            ".line-3",
            { scaleX: 0, transformOrigin: "left center", ease: "none" },
            0
        ).to(".flair", { rotation: 360 }, 0);

        let links = gsap.utils.toArray("nav a");
        links.forEach((a) => {
            let element = document.querySelector(a.getAttribute("href")),
                linkST = ScrollTrigger.create({
                    trigger: element,
                    start: "top top"
                }),
                highlightST = ScrollTrigger.create({
                    trigger: element,
                    start: "top center",
                    end: "bottom center",
                    onToggle: (self) => self.isActive && setActive(a)
                });
            a.addEventListener("click", function (e) {
                e.preventDefault();
                gsap.to(window, { duration: 1, scrollTo: linkST.start, overwrite: "auto" });
            });
        });

        function setActive(link) {
            links.forEach((el) => el.classList.remove("active"));
            link.classList.add("active");
        }
    });

    return (
        <>

            {/* <div className='box'></div> */}
            <div id="one" className="description panel plain">
                <h1>Navigation links with smooth scrolling</h1>
                <p>ScrollTrigger works great with navigation links within the page! Try clicking one of the links above and see how ScrollTrigger stays perfectly synced.</p>
                <div className="scroll-down">
                    <div className="arrow"></div>

                </div>
            </div>

            <section id="two" className="panel red">
                <div className="line-cont">
                    <span className="line line-1"></span>
                </div>
                <p>This line's animation will begin when it enters the viewport and finish when its top edge hits the top of the viewport, staying perfectly in sync with the scrollbar because it has <code>scrub:&nbsp;true</code></p>
            </section>

            <section id="three" className="panel orange">
                <div className="line-cont">
                    <span className="line line-2"></span>
                </div>
                <p>This orange panel gets pinned when its top edge hits the top of the viewport, then the line's animation is linked with the scroll position until it has traveled 100% of the viewport's height (<code>end: "+=100%"</code>), then the orange panel is unpinned and normal scrolling resumes.</p>
                <p>Padding is added automatically to push the rest of the content down so that it catches up with the scroll when it unpins. You can set <code>pinSpacing: false</code> to prevent that if you prefer.</p>
            </section >

            <section id="four" className="panel green">
                <div className="line-cont">
                    <span className="line line-3"></span>
                </div>
                <p>This panel gets pinned in a similar way, and has a more involved animation that's wrapped in a timeline, spinning a shape in addition to the line, all synced with the scroll position perfectly.</p>
                <div className="flair flair--3"></div>
            </section>

            <section id="five" className="panel plain">
                DONE!
            </section>

            <nav className="fixed-nav">
                <div><a href="#one">one</a></div>
                <div><a href="#two">two</a></div>
                <div><a href="#three">three</a></div>
                <div><a href="#four">four</a></div>
                <div><a href="#five">five</a></div>
            </nav>
        </>
    )
}

export default TestScroll;