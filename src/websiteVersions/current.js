export const site_template = {
    pages: [
            {
              id:1,
              name:"Site Creator",
              path:"/"
            },
            {
              id:2,
              name:"How It Works",
              path:"/how-it-works"
            }, 
            {
              id:3,
              name:"Need Help",
              path:"/need-help"
            },
            {
              id:4,
              name:"Getting Started",
              path:"/getting-started"
            },
            {
              id:5,
              name:"Components",
              path:"/components"
            },
            
            // {
            //   name:"Contact",
            //   path:"/contact"
            // }
          ],
    ["Site Creator"]: [
        { 
          name: "Header",
          id: `Site Creator-Header-0-589`,
          content: { headerHtml: "React Site Creator" }
        },
        {
          name: "Navbar",
          id: `Site Creator-Navbar-1-469 `,
          content: {}
        },
        
        {
          name: "CountDown",
          id: `Site Creator-CountDown-2-381`,
          // content:{src: "construction.png"}
        },
        {
          name: "Paragraph",
          id: `Site Creator-Paragraph-2-381`,
          content: { html: `<h3>This website creator is a <strong>FREE</strong> tool built just for you! Create your own website complete with all the necessary components to build a successful blog, portfolio, or business site.</h3>
                            <h3>You can use this website creator for <strong>FREE </strong>for personal or commercial use.* You only have to buy a domain name for your site and pay for hosting service, and unfortunately we can't provide you with either.</h3>
                            <h3>If you would like help getting your website up and running with a domain name, business email, and this software, we are more than willing to help. Go to the <a href="need-help" rel="noopener noreferrer"  style="color: rgb(29, 146, 178);">Need Help</a>
                            <span style="color: rgb(255, 255, 255);"> </span>page to get some professional assistance.</h3>
                            `
                    
                        },
        },
        {
          name: "Mosaic",
          id: `Site Creator-Mosiac-3-387`,
          content: {
            lPicContent: {src:"test.png"},
            lLinkBoxContent:{
              title:"Get Your Own Site",
              subTitle:"Pay Us Nothing",
              linkTxtContent:{
                txt:"These are the steps",
                href:"getting-started"
              }
            },
            rPicContent: {src:"test2.png"},
            rLinkBoxContent:{
              title:"Everything Is Editable",
              subTitle:"Try editing this website",
              linkTxtContent:{
                txt:"This tutorial explains how.",
                href:"how-it-works"
              }
            }
          }
        },
        {
          name: "PlanComparison",
          id: `Site Creator-PlanComparison-4-984`,
          content: {
            header:"Site Generator Comparison",
            colCount: 3,
            colNameHtmls: [
              "Wix Pro\n$27 / Month",
              "WordPress Business\n$25 / Month",
              "React Site Creator\n*100% Free"
            ],
            rowGroupCount: 2,
            rowGroups: [4, 3],
            comparisonRowContent: [
              {
                header: "Calender",
                rowChecks: [true, true, true]
              },
              {
                header: "Email List",
                rowChecks: [true, true, true]
              },
              {
                header: "Socials Analytics",
                rowChecks: [false, false, true]
              },
              {
                header: "Modern Web Technology**",
                rowChecks: [false, false, true]
              },
              {
                header: "Instant Changes",
                rowChecks: [false, false, true]
              },
              {
                header: "Free To Use ***",
                rowChecks: [false, false, true]
              },
              {
                header: "Add your own",
                rowChecks: [false, true, true]
              }
            ],
            captionHtml: `<div>* We don't provide domain names or web hosting (neither are free but it will still cheaper than the alternatives). Go to the "Get Your Own" page to get some pointers.</div>
                          <div>** Wix and Wordpress are built using PHP which was created in 1994. We rely primarily on React which was released almost 2 decades later</div>
                          <div>*** Wix and Wordpress are both "Free to use" but expect to pay for any necessary features</div>`
          }
      
        },
        {
          name: "Footer",
          id: `Site Creator-Footer-5-${ String(new Date().getTime()).slice(-3) }`,
        }
    ],
    ["Getting Started"]: [
      {
        name: "Header",
        id: `Getting Started-Header-0-654`,
        type: "h1",
        content: { headerHtml: "React Site Creator" }
      },
      {
        name: "Navbar",
        id: `Getting Started-Navbar-1-891`,
        content: {}
      },
      {
        name: "WalkThrough",
        id: `Getting Started-WalkThrough-2-886`,
        content: {
          pagePath:"getting-started",
          links: [],
          html: `<h1 id ="Prerequisites-h1">Prerequisites</h1>
                  <p><strong>TLDR: </strong>To start, you need a website hosting provider and a domain name. While there are free options they probably won't work for a business and other websites.</p>
                  <br>
                  <p>React Site Creator is a completely free software (for private and most commercial uses) but there are a couple of items required to set up and deploy the site creator. This walkthrough will guide you through start to finish.</p>
                  <h2 id = "HostingOptions-h2">Hosting Options</h2>
                      <p>In order for people to visit the website it needs to be hosted. There are many different options when it comes to website hosting including a few free options (although they might not fit your needs).</p>
              
                      <h3 id = "GitHubPages-h3">GitHub Pages</h3>
                          <p>For hobbyists or STEM professionals, GitHub provides free website hosting through <a href="https://pages.github.com/" target="_blank">GitHub Pages</a>. This website is hosted on GitHub Pages but will eventually move to its own site when necessary.</p><h4>GitHub Pages is Static Only</h4><p>* Please note that GitHub Pages can only deploy client-side websites. Because a server-side computer is not involved, users will <strong>not</strong> be able to modify anything permanently on the page. This means users will not be able to send you any information. </p>
                          <br>
                          <p>- For example if a blog component has comments enabled, users will be able to comment, but there comments will only be visible to them.</p><h3>Hosting Providers</h3><p>For a business website, or any situation where users need to be able to modify the data (make an appointment, post a comment), you will a hosting service that provides a server.</p><br><p>Do some research and pick a provider that best suites your needs. You can expect to pay anywhere from $10-$100+ a month to have you site hosted (the price will depend on the amount of traffic the website will have and the additional features and functionality offered).  Here are some references to aid in your search:</p>
                          <ul>
                              <li><a href="https://www.pcmag.com/picks/the-best-web-hosting-services" target="_blank">The Best Web Hosting Services</a></li>
                              <li><a href="https://www.websitebuilderexpert.com/web-hosting/comparisons/" target="_blank">Web Hosting Comparison</a></li>
                          </ul>
                          <br>
                          <p>After you have selected and started a hosting plan you need to get a domain name for your site.</p>
                          <br>
                  <h2 id = "ObtainADomain-h2">Obtain a Domain</h2>
                      <p>If you have chosen to host your site through a free web-hosting service (again, this is probably not a good option for businesses), you may have a subdomain (ex. GitHubPages gives you a free subdomain at &lt;Username&gt; .github.io/&lt;WebsiteName&gt;/)</p>
                      <br>
                      <p>If do not have a subdomain provided for you, you need to rent a domain/lease a domain name. There are plenty of providers that offer essentially the same service. You really can't go wrong so long as you stick to a known brand. Google <a href="https://domains.google/" target="_blank">offers</a> domain names at around $12 a year. </p>
                      <br>
                <h1 id = "SetUp-h1">Set Up</h1>
                  <h2 id = "InstallNode.Js-h2">Install Node.js</h2>
                  <p>To download React-Site-Creator you will need to first download <a href = "https://nodejs.org/en/download/">Node.js</a>. Node.Js comes with Node package manager (npm) which is where we can pull the code for the React Site Creator.</p>
                  <h2 id = "CloneSiteCreator-h2">Download and Configure the React-Site-Creator</h2>
                      <p>The next steps are dependent on how you want your website configured. There are two different versions of the application: the first is for static websites, and the second is for dynamic websites.</p>
                      <br>
                      <h3>Static or Dynamic?</h3>
                          <p>A static website is one which a user can't change. They may be able to interact with widgets, click buttons, etc., but they won't be to change the website for another user.</p> 
                          <br>
                          <p>Dynamic websites, on the otherhand, allow for users to manipulate the website. To illustrate the difference, the following examples are only implementable on dynamic sites</p>
                          <ul>
                              <li>Users to write comments on blog posts</li>
                              <li>Users blocking out specific appointment times</li>
                              <li>Having a limit on shop items (i.e. item is sold out)</li> 
                          </ul>
                          <br>
                          <p>If you are still unsure, go with the dynamic website because you won't be limited to static only components.</p>
                      <h3>Static Website</h3>
                          <p>If your are going with a dynamic site skip this step. </p> 
                          <br>
                          <p>Open a terminal on your computer.</p>
                          <code>git clone https://github.com/jado66/site-creator.git</code>
                          <code>npm start</code>
                      <h3>Dynamic Website</h3>
                        <br>
                        <p>Open a terminal on your computer.</p>
                        <code>git clone https://github.com/jado66/site-creator.git</code>
                        <code>npm start</code>
                <h1 id = "CustomizeYourWebsite-h1">Customize Your Website</h1>
                    <p>Everything is customizable. To edit make sure you are logged in.</p>
                    <p>Everything is customizable. To edit make sure you are logged in.</p>
        
  
  
                `
          
        }
      },
      {
        name: "Footer",
        id: `Getting Started-Footer-5-298`,
        content: { }
      }
    ],
    ["Need Help"]:[
      {
        name: "Header",
        id: `Need Help-Header-0-654`,
        type: "h1",
        content: { headerHtml: "Need Help?" }
      },
      {
        name: "Navbar",
        id: `Need Help-Navbar-1-381`
      },
      {
        name: "Paragraph",
        id: `Need Help-Paragraph-2-381`,
        content: 
          { html: `<h3>When creating a website you need a few things:</h3>
          <h5 class="ql-indent-1">
          <br>
          </h5>
          <h3 class="ql-indent-1">1) Purchase a domain name</h3>
          <h3 class="ql-indent-1">2) Find hosting service</h3>
          <h3 class="ql-indent-1">3) Set up the server computer</h3>
          <h3 class="ql-indent-1">4) Develop the website</h3>
          <h5 class="ql-indent-1">
          <br>
          </h5>
          <h3>Without this software the last step is the most costly and takes the most time. Some sources say it takes a minimum of 14 weeks to develop a website. Paying an Full Stack Engineer's wages for a minimum of 14 weeks could cost you upwards of tens of thousands. With this software the last step is much much easier.</h3>
          <p>
          </p>
          <h3>We can help you with all of the steps. </h3>
          `
          },
          // - 
      },
      {
        name:"ListComparisonTable",
        id:"Need Help-ListComparisonTable-2-381",
        content:[
          {
          header:"Basic Help (Steps 1-3)",
          price:"500$",
          bodyContent: {html:` <p>- Personal domain and business email</p>
                        <p>- 1 Year of website hosting included</p>
                        <p>- Server set up and Installation</p>
                        <p>- Upload any templates or site files</p>`}
        },
        {
          header:"Advanced Help (Steps 1-4)",
          price:"1,250$",
          bodyContent: {html:` <p>- Everything in the Basic Help Package</p>
                        <p>- 2 Years of website hosting included</p>
                        <p>- Help with website design</p>
                        <p>- Payment & Social Media integration</p>`}
        },
        {
          header:"Custom Help",
          price:"Inquire Below",
          bodyContent:{html:` <p>- Want a custom component?</p>
                        <p>- Want to do more with your website?</p>
                        <p>- Want a custom website style or design?</p>
                        <p>- Anything else?</p>`}
        },
        ]
      },
      {
        name: "Header",
        id: `Need Help-Header-4-654`,
        type: "h1",
        content: { headerHtml: "Have additional questions?" }
      },
      {
        name: "EmailSender",
        id: `Need Help-EmailSender-4-654`,
        content: {
          
        }
      }
    ],
    ["How It Works"]: [
      { 
        name: "Header",
        id: `How It Works-Header-0-${ String(new Date().getTime()).slice(-3) }`,
        content: { headerHtml: "React Site Creator" }
      },
      {
        name: "Navbar",
        id: `How It Works-Navbar-1-${ String(new Date().getTime()).slice(-3) }`,
        content: {}
      },
      {
        name: "WalkThrough",
        id: `How It Works-WalkThrough-2-886`,
        content: {
          pagePath:"how-it-works",
          links: [],
          html: `<h1>Everything Is Customizable</h1>
          <p>Literally everything is customizable to some degree or another. Go ahead and try and edit something. You should be able to just click on text and start typing. Other components may have a pencil icon that will toggle editing. </p>
          <p>If you can't edit anything you probably have edit mode turned off.</p>
          <h2>Admin Edit Mode</h2>
          <p>To begin customizing the website first ensure that edit mode is on. If you can click on the page header "How It Works" and change it to whatever you would like, then you are in edit mode. Congrats! Go ahead and skip to the next section. If not, you will need to go to your admin landing page. Go ahead and change the browser url to /&lt;your-site-name&gt;/admin. This page is called jado66.github.io/site-creator so my final url will look like this:</p>
          <pre class="ql-syntax" spellcheck="false">https://jado66.github.io/site-creator/admin</pre>
          <p>When you hit enter you'll be prompted with a login page (if you haven't logged in before). Sign in by whatever method you prefer and check "Remember Me" if this is your personal computer. </p><p>You should immediately see the editor ribbon under the "Admin Editor Tools" header. Go ahead and click the on the admin controls.</p>
          <p> It looks like this:    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAoCAYAAAC8cqlMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMmSURBVGhD1Vm9dtowFHZ5AXiCwNRsZmq7kanZoEs6kicInZoNtnQqeQLSFyhZSjfSF2g74S2dYGs78QbO/cSVjxz92AYZw3fOd64sS7Kk+6MrCLbB4+OfeDgaxZ2zs7jRaMRUJSSex7e3Md5vWh4o/v77H/cvL8XEs4h2aE/lw8LPX7/jZqulTdhFtEc/Kh8GYCrShIoS/Q7G1NrttjbBIuT+1WIyudMmtg15nOpQ1C9srFQrbNveWKav1FgasYgWXPID3+OpcC4kWkRc8gPf46lwLuSY4FxI2A655Ae+x8uNY3L2TDSbTW1C2zAMQ8jqcCwH4guWTmA3o2j7iEP9A+qf61vA/OFHsujmyUlwevoyd18nYNv1ej21w3mJfnl9gzNljd1uD9IPRBpf0F/QvkgaP58/aGOAnU4H0h/Exarf1z5kItoVvVjtbSESMJXP47H4gDQ5SDyjPsuU5E1TagvPuDq77jy4RvNCk/aVZ9TqdRnlIhn2YPAhaV/ppe3rdJqa2K6U1wNnWIMKEXYjylrX67Woo47B+4uLzHA4vb+PF4tNtktRJ3jz+pXog91cLZei3hdoc8wLge1+urkJZrNvXJMGqTTo9no49YktIVerFXEp5PfZLFk4QOoXZwFs/Pz8Lde6Qf7GY664xg7yHy4pgA2S8E2BPGY1HI4gE2BTOb2xMhXVYEa7/shgoxpd4Jx8wGm8uhpAakAf04GMOi1y9XrvtIa+iOiiHoy288J1eJoWr2pC3EewKps/+AD8hZxd7CxXGSEDggkIMi7UYFLX1x/5sRyQCcDWM5M/l0ZkBLSCbaxUPvcRmxm7fMR06qNucvdl08fmeJ4pkCtqUepBMgG0lBWEkL7s/HNoHsJ8SVqd3ERMLm/qIp1ee+Gbqmn5ujqrZE2bX/ok76yA71xL/S1Ae1kGVa2odxqUi2gJAUG2x4GohvRUw7KICCN9BRILkOEWz0hNTKe3JPxA3kcAtJcmJZHqUCY57FphCwapXMqCGlLsfQHZAxajagZ/nsrnncDq3TvV0CpNxjYXPuuygQHQ2GWjZRHffZ6DYWGS+bQVBE9ClNr0DLkDwwAAAABJRU5ErkJggg=="></p>
          <p>Make sure that "Admin Edit Mode" is checked. If you would like to see the editor ribbon while you make edits click the "Show Admin Editor" checkbox.</p>
          <p>Now go and have fun!</p>
          <h2>Dynamic Pages</h2>
          <p>Your site should come with a few pre-defined pages. You can change each pages name, the path, and add or delete pages as you like.</p>
          <p>To do so, go to the editor ribbon (see the previous step if it isn't at the top of the page) and click on the pages menu. </p>
          <p>It looks like this:    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAoCAYAAADpE0oSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFESURBVFhH7ZjNbYMwFIBfsgCcktzYIGzABqETMEXaG0zDBskpyY1b2xPdgFvbE0xA3gPrSQRjOYlxVcmf9ORf+GxDLGIg3j8+2zh+aTH7dIRh2KZZRnk1JMXEeNAAvn9+KS9nt4tHF5kKlXyBwQ2e5wF2FiU9yrKEpmlEaQzd73S+wGa9ItcAHmEURdLRqRDXcCRJMihTTM2cO5gQU52unBtNiQkdOTeYFBNTckw7uNK0mJDJ0zRrl5iZlTzPFygXpZ7j8dClPBJDM9aK2Wc8xdPiIAhE7j4GOxcuGxRFMdphVNDP4+11D1VViRo5sh2O1/2RZ6zL7bvwf5/xozixNZzYGk5sDSe2hhNbw4mt8Wfiweet7/uwvfOPuS5f+Hlb13WXpwOAWY8ipqJzznX4ogrh7E9+aBS4BKNOpoLuTY5eCnAFGmNf8DBo/xoAAAAASUVORK5CYII="></p>
          <p>In the pages menu you will a submenu for each of your websites pages. In each submenu you will be able to change either the name or path of the page. There is also a link to the page and a delete option. </p>
          <blockquote>Pro tip: It might be difficult if to try and change the page you are currently on. This is because with each key press the page will be re-rendered under and updated with a new name or new path. To avoid this, simply navigate to another page on your site and then return after making modifications. </blockquote>
          <p>In addition to your website pages you will find submenus for the Checkout Page and your Admin page. For the time being these submenus only have links to visit the pages. </p>
          <p>To add pages simply press the "<strong>+</strong>" button and give your new page a name and a path. Make sure that each page has a unique name and path.</p>
          <p>You might expect a new page to be automatically added to your navigation bar, however, this is not the case. </p>
          <h2>Editing The Navigation bar</h2>
          <p>The navigation bar, a.k.a. the navbar, operates independent of your sites pages. This is behavior is intentional to allow for pages to be separated from the main website content (some examples we'll be given later on) and to allow for external links to be added to the navbar.  </p>
          <p>While in edit mode, the positioning of the links can be modified by hovering the mouse cursor over each link. You will notice edit buttons appear on both sides of the link. The "<strong>+</strong>" button will insert a link on either the left or the right side of the link, while the double arrowed buttons, "<strong>&gt;</strong>", will swap the link's position with its neighbor.   </p>
          <p>To edit the link names, or to delete links, move your cursor to the anywhere on the navbar and you will see a pencil icon. When clicked on all of the links will become editable. You can edit both the link text and the link path much like the pages.</p>
          <blockquote>Pro tip: Make sure all external links start with "https://". If the paths start with "/" they will be internal links and will direct you and users to a page in the website, which may or may not exist. </blockquote>
          <p><br></p>`
        }
      },
      {
        name: "Footer",
        id: `Site Creator-Footer-5-${ String(new Date().getTime()).slice(-3) }`,
      }
  ],
    ["Components"]: [
    { 
      name: "Header",
      id: `Components-Header-0-459`,
      content: { headerHtml: "React Site Creator" }
    },
    
    {
      name: "Navbar",
      id: `How It Works-Navbar-1-496`,
      content: {}
    },
    { 
      name: "Header",
      id: `Components-Header-2-896`,
      content: { headerHtml: "Gallery: Try Dragging The Pictures" }
    },
    {
      name:"PhotoGallery",
      id:"Components-Gallery-3-837",
      content: { }
    },
    { 
      name: "Header",
      id: `Components-Header-4-879`,
      content: { headerHtml: "Appointments: Connect To Your Google Calendar" }
    },
    {
      name:"Appointments",
      id:"Components-Appointments-5-837",
      content: { }
    },
    {
      name:"Mosaic",
      id:"Components-Mosiac-6-165",
      content: {
        lPicContent: {src:"test.png"},
        lLinkBoxContent:{
          title:"Get Your Own Site",
          subTitle:"Pay Us Nothing",
          linkTxtContent:{
            txt:"These are the steps",
            href:"getting-started"
          }
        },
        rPicContent: {src:"test2.png"},
        rLinkBoxContent:{
          title:"Everything Is Editable",
          subTitle:"Try editing this website",
          linkTxtContent:{
            txt:"This tutorial explains how.",
            href:"how-it-works"
          }
        }
      }
    },
    
    {
      name: "Footer",
      id: `Site Creator-Footer-5-${ String(new Date().getTime()).slice(-3) }`,
    }
  ],
  };