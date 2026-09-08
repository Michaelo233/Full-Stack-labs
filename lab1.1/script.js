const Department = [
    {
        name: "Administration",
        employees: [
            "Zoë Robins",
            "Madeleine Madden"
        ]
    },
    {
        name: "Audit",
        employees: [
            "Josha Sadowski",
            "Kate Fleetwood"
        ]
    },
    {
        name: "Banking Operations",
        employees: [
            "Priyanka Bose",
            "Hammed Animashaun",
            "Álvaro Morte",
            "Taylor Napier",
            "Alan Simmonds"
        ]
    },
    {
        name: "Communications",
        employees: [
            "Gil Cardinal",
            "Richard J. Lewis"
        ]
    },
    {
        name: "Corporate Services",
        employees: [
            "Randy Bradshaw",
            "Tracey Cook",
            "Lubomir Mykytiuk"
        ]
    },
    {
        name: "Facilities",
        employees: [
            "Dakota House",
            "Lori Lea Okemah",
            "Renae Morrisseau",
            "Rick Belcourt"
        ]
    },
    {
        name: "Financial Services",
        employees: [
            "Selina Hanusa",
            "Buffy Gaudry",
            "Shaneen Ann Fox",
            "Allan Little",
            "Danny Rabbit"
        ]
    },
    {
        name: "Human Resources",
        employees: [
            "Jesse Ed Azure",
            "Stacy Da Silva",
            "Vladimir Valenta",
            "Samone Sayeses-Whitney",
            "Paul Coeur"
        ]
    },
    {
        name: "Information Technology",
        employees: [
            "Graham Greene",
            "Sandika Evergreen",
            "Jennifer Rodriguez",
        ]
    },
    { name: "IT Technicians", 
        employees: [
        "Aiyana Littlebear",
        "Inara Thunderbird",
        "Kaya Runningbrook",
        "Elara Firehawk",
        "Siona Moonflower",
        "Kaiyu Greywolf",
        "Ayawamat Nightwind",
        "Tala Braveheart",
        "Iniko Stonebear",
        "Onatah Redhawk"
        ]
    }
];

const Employee = [
    {
        firstName: "Zoë",
        lastName: "Robins"
    },
    {
        firstName: "Madeleine",
        lastName: "Madden"
    },
    {
        firstName: "Josha",
        lastName: "Sadowski"
    },
    {
        firstName: "Kate",
        lastName: "Fleetwood"
    },
    {
        firstName: "Priyanka",
        lastName: "Bose"
    },
    {
        firstName: "Hammed",
        lastName: "Animashaun"
    },
    {
        firstName: "Álvaro",
        lastName: "Morte"
    },
    {
        firstName: "Taylor",
        lastName: "Napier"
    },
    {
        firstName: "Alan",
        lastName: "Simmonds"
    },
    {
        firstName: "Gil",
        lastName: "Cardinal"
    },
    {
        firstName: "Richard J.",
        lastName: "Lewis"
    },
    {
        firstName: "Randy",
        lastName: "Bradshaw"
    },
    {
        firstName: "Tracey",
        lastName: "Cook"
    },
    {
        firstName: "Lubomir",
        lastName: "Mykytiuk"
    },
    {
        firstName: "Dakota",
        lastName: "House"
    },
    {
        firstName: "Lori Lea",
        lastName: "Okemah"
    },
    {
        firstName: "Renae",
        lastName: "Morrisseau"
    },
    {
        firstName: "Rick",
        lastName: "Belcourt"
    },
    {
        firstName: "Selina",
        lastName: "Hanusa"
    },
    {
        firstName: "Buffy",
        lastName: "Gaudry"
    },
    {
        firstName: "Shaneen Ann",
        lastName: "Fox"
    },
    {
        firstName: "Allan",
        lastName: "Little"
    },
    {
        firstName: "Danny",
        lastName: "Rabit"
    },
    {
        firstName: "Jesse Ed",
        lastName: "Azure"
    },
    {
        firstName: "Stacy",
        lastName: "Da Silva"
    },
    {
        firstName: "Vladimir",
        lastName: "Valenta"
    },
    {
        firstName: "Samone",
        lastName: "Sayeses-Whitney"
    },
    {
        firstName: "Paul",
        lastName: "Coeur"
    },
    {
        firstName: "Graham",
        lastName: "Greene"
    },
    {
        firstName: "Sandika",
        lastName: "Evergreen"
    },
    {
        firstName: "Jennifer",
        lastName: "Rodriguez"
    },
    {
        firstName: "Aiyana",
        lastName: "Littlebear"
    },
    {
        firstName: "Inara",
        lastName: "Thunderbird"
    },
    {
        firstName: "Kaya",
        lastName: "Runningbrook"
    },
    {
        firstName: "Elara",
        lastName: "Firehawk"
    },
    {
        firstName: "Siona",
        lastName: "Moonflower"
    },
    {
        firstName: "Kaiyu",
        lastName: "Greywolf"
    },
    {
        firstName: "Ayawamat",
        lastName: "Nightwind"
    },
    {
        firstName: "Tala",
        lastName: "Braveheart"
    },
    {
        firstName: "Iniko",
        lastName: "Stonebear"
    },
    {
        firstName: "Onatah",
        lastName: "Redhawk"
    }
];

document.addEventListener("DOMContentLoaded", () => {
  const mainElement = document.querySelector("main");

  Department.forEach(dept => {
    // Create section container for the department
    const section = document.createElement("section");
    
    // Add department title
    const heading = document.createElement("h2");
    heading.textContent = dept.name;
    section.appendChild(heading);

    // Create unordered list for employees
    const ul = document.createElement("ul");

    dept.employees.forEach(employeeName => {
      const li = document.createElement("li");
      li.textContent = employeeName;
      ul.appendChild(li);
    });

    section.appendChild(ul);

    // Inject department section into <main>
    mainElement.appendChild(section);
  });
});