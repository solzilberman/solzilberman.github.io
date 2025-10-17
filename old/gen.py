DATA = {
    "Experience": [
        {
            "title": "Research Assistant",
            "date": "August 2022 - May 2023",
            "org": "Michigan State University",
            "description": "Researched state of the art techniques for the development and deployment of trustworthy learning-enabled autonomous systems, with focus on adaptive unmanned aerial vehicles employing object detection models."
        },
        {
            "title": "Automation Engineer Intern",
            "date": "Summer 2022",
            "org": "Ironclad",
            "description": "Expanded automation framework and increased regression detection for over 500,000 yearly user events via custom mobile testing suite."
        },
        {
            "title": "Security Engineer Intern",
            "date": "Summer 2021",
            "org": "Accenture",
            "description": "Improved internal security infrastructure through development of data-driven Python applications, increasing security incident detection rate and minimizing response time."
        },
        {
            "title": "Software Engineer Intern",
            "date": "Summer 2020",
            "org": "Perflo",
            "description": "Developed and implemented a data analytics dashboard using GraphQL API, Postgresql, and a custom React library for a B2B project-management application."
        }
    ],
    "Teaching": [
        {
            "title": "CSE 325 - Computer Systems",
            "date": "Spring 2024",
            "org": "Michigan State University",
            "description": "Process and processor management. Concurrent processes and threads. Memory management and the memory hierarchy. Networking and network protocols. Secure programming and communication methods.",
            "reference": "https://reg.msu.edu/Courses/Request.aspx?SubjectCode=CSE&CourseNumber=325#Results"
        },
        {
            "title": "CSE 231 - Introduction to Programming",
            "date": "Fall 2023",
            "org": "Michigan State University",
            "description": "Introduction to programming using Python. Design, implementation and testing of programs to solve problems such as those in engineering, mathematics and science. Programming fundamentals, functions, objects, and use of libraries of functions.",
            "reference": "https://reg.msu.edu/Courses/Request.aspx?SubjectCode=CSE&CourseNumber=231#Results"
        }
    ],
    "Education": [
        {
            "title": "Doctor of Philosophy, Computer Science",
            "date": "(Exp) 2026",
            "org": "Michigan State University",
            "description": "Advisor: Dr. Betty H.C. Cheng<br/>Awards: Distinguished Engineer Fellowship Recipient"
        },
        {
            "title": "Bachelor of Science (B.S.) Mathematics & Computer Science, Minor in Philosophy",
            "date": "2018 - 2022",
            "org": "Purdue University",
            "description": "Awards: Freshman Honors Society, National Honors Society"
        }
    ]
}

PREAMBLE = """
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Sol Zilberman</title>
  <meta name="viewport" content="width=device-width" />
  <script defer src="https://us.umami.is/script.js" data-website-id="0387cffb-80f3-42cd-baa3-eb99dc661de2"></script>
  <!-- <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap" rel="stylesheet"> -->
  <script src="data/info.js"></script>
  <link rel="stylesheet" href="styles/font-awesome-4.7.0/css/font-awesome.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles/style.css">
  <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/pcooksey/bibtex-js@1.0.0/src/bibtex_js.min.js"></script>
  <bibtex src="data/citations.bib"></bibtex>
</head>

<body>
  <div class="left-div">
    <div class="header">
      <div class="header-name">
        <h2 class="my-name">Sol Zilberman</h2>
        <p>
          Computer Science PhD Student @ Michigan State University.
        </p>
        <p>
          <!-- <a href="_"> -->
          <i class="fa fa-globe"> </i> Chicago, Illinois
          <!-- </a> -->
        </p>
        <div class="social-icons-container">
          <a href="https://github.com/solzilberman" class="social-icon">
            <i class="fa fa-github-square fa-2x"></i>
          </a>
          <a href="https://www.youtube.com/@solzilberman2529" class="social-icon">
            <i class="fa fa-youtube-square fa-2x"></i>
          </a>
          <a href="https://www.linkedin.com/in/solzilberman/" class="social-icon">
            <i class="fa fa-linkedin-square fa-2x"></i>
          </a>
          <a href="mailto:sol.zilberman@gmail.com" class="social-icon">
            <i class="fa fa-envelope-square fa-2x"></i>
          </a>
          <a href="https://scholar.google.com/" class="social-icon">
            <i class="fa fa-google fa-2x"></i>
          </a>
        </div>
      </div>
      <img src="data/profile-picture.jpg" width="120px" alt="My Photo">
    </div>
  </div>
  <!-- </div> -->
  <div class="right-div">
    <div class="section">
      <h2>> Research Interests</h2>
      <p class="experience-description"> My research focuses on assurance for learning-enabled safety-critical systems
        (e.g., autonomous vehicles). Below is a collection of broad topics my work has touched upon thus far.</p>
      <div class="section-content">
        <div class="research-interests">
          <button class="pill">Evolutionary Computation</button>
          <button class="pill">Trustworthy Autonomous Vehicles</button>
          <button class="pill">Deep Learning</button>
          <button class="pill">Reinforcement Learning</button>
          <button class="pill">High Assurance Computing</button>
          <button class="pill">Game Theory</button>
          <button class="pill">Computer Graphics</button>
          <button class="pill">Adaptive Systems</button>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>> Publications</h2>
    <div id="bibtex_display"></div>
  </div>
"""

POSTAMBLE = """
</body>
</html>
"""

def generate_html(category, data):
    title_text = category.title()
    html_content = f"<div id=\"{category.lower()}-section\" class=\"section\"><h2>> {title_text}</h2><div class=\"experience-section\">"
    for item in data:
        description = f"<i>\"{item['description']}\"</i>" if category == "Teaching" else item['description']
        reference = f"[<a href=\"{item['reference']}\" target=\"_blank\">ref</a>]" if 'reference' in item else ''
        html_content += f"""
        <div class="experience">
            <div class="experience-title">
                <span class="title-text">{item['title']}</span>
                <span class="title-company">{item['date']}</span>
            </div>
            <div class="experience-description">
                <span class="experience-location">{item['org']}</span><br>
                {description} {reference}
            </div>
        </div>
        """
    html_content += '</div></div>\n'
    return html_content

CONTENT=""
for category in ['Teaching', 'Education','Experience']:
    CONTENT+=generate_html(category, DATA[category])

# print(PREAMBLE + CONTENT + POSTAMBLE)
with open('index2.html', 'w') as f:
    f.write(PREAMBLE + CONTENT + POSTAMBLE)