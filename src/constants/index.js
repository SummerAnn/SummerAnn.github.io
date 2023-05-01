import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    meta,
    starbucks,
    tesla,
    shopify,
    carrent,
    jobit,
    tripguide,
    threejs,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "Data Analyst-Bioinformatics",
      icon: mobile,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "Model",
      icon: creator,
    },
  ];
  
  const technologies = [
    {

      name: "HTML 5",
      icon: html,
    },
    {
        name: "C/C++",
        icon: c++,
      },
    {
        name: "Python",
        icon: python,
    },
    {

      name: "SQL",
      icon: sq,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "docker",
      icon: docker,
    },
  ];
  
  const experiences = [
    {
      title: "React.js Developer",
      company_name: "Starbucks",
      icon: starbucks,
      iconBg: "#383E56",
      date: "March 2020 - April 2021",
      points: [
        "Developing and maintaining web applications using React.js and other related technologies.",
        "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Participating in code reviews and providing constructive feedback to other developers.",
      ],
    },
    {
        title: "Data Analyst",
        company_name: "Michigan Medicine",
        icon: science,
        iconBg: "#383E56",
        date: "Aug 2022 - present",
        points: [
          "Deep Learning, Python, C++, Machine Learning for the Short Tandem Repeat.",
          "Biotech research, computational medicine, gene sequencing, CRISPR research.",
          "Researching the Short Tandem Repeats Analysis with the Bioinformatic tools and downstream.",
          "Louvain Clustering, PCA, UMAP, MD, and Tsne"
        ],
      },
    {
      title: "Data Analyst",
      company_name: "Michigan Medicine",
      icon: brain,
      iconBg: "#383E56",
      date: "May 2022 - Sep 2022",
      points: [
        "Researched neurological disorders ALS and FTD (Frontal Temporal Disorder) data analysis using SQL",
        "Conducted 10+ experiments a week to prove how CGG repeats in introns impact the expression of FMRP.",
        "Laboratory: Western Blot, Cell/Tissue Culture, PCR, Gene Transfer, RNA generation, Image Scanning, plasmid vector,DNA transfection, Behavioral Analysis, XMAlab, Clinical Research, Patient Interaction"
      ],
    },
    {
        title: "Data Analyst",
        company_name: "Michigan Medicine",
        icon: genes,
        iconBg: "#383E56",
        date: "May 2022 - Sep 2022",
        points: [
            "Analysis of XROMM (X-ray Reconstruction of Moving Morphology) data using XMA lab",
            "Collected the data from 20+ genetically engineered Evc2 mutant mice and transplanted the magnet into the mandible."
        ],
      },
    
    {
      title: "Full stack Developer",
      icon: meta,
      iconBg: "#E6DEDD",
      points: [
        "Developing and maintaining web applications using React.js and other related technologies.",
        "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Participating in code reviews and providing constructive feedback to other developers.",
      ],
    },
  ];
  
 
  
  const projects = [
    {
      name: "Car Rent",
      description:
        "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "mongodb",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://github.com/",
    },
    {
      name: "computer vision",
      description:
        "Developed a program for created a program that uses seam carving for content-aware resizing of images. Maximized concurrency for high performance using multi-threaded programming and network protocols.",
      tags: [
        {
          name: "c/c++",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "green-text-gradient",
        },
        {
          name: "scss",
          color: "pink-text-gradient",
        },
      ],
      source_code_link: "https://github.com/",
    },
    {
      name: "Database Construction and ML",
      description:
        "Constructed a relational database in C++ using hashmap, set, union-find, and priority queue. The database accepts commands from a SQL-like language to efficiently execute commands, including select. Add, delete, print, join, and generate indices. The database can execute 1,000 queries in under 1.5 seconds",
      tags: [
        {
          name: "C++",
          color: "blue-text-gradient",
        },
        {
          name: "Machine Learning",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      source_code_link: "https://github.com/",
    },
    {
        name: "Downstream Analysis with Machine Learning, Sei Modeling (Short Tandem Repeat)",
        description:
          "Data mapping and analysis with machine learning, Sei modeling, and DNA sequencing (Pac Bio).Clustering (PCA, T-SNE, UMAP, LDA) trajectory inference, cell-type annotation and integrating datasets.recursion, binary trees, templates, comparators, and the map data structure",
        tags: [
          {
            name: "C++",
            color: "blue-text-gradient",
          },
          {
            name: "Machine Learning",
            color: "green-text-gradient",
          },
          {
            name: "Python, R, SQL",
            color: "pink-text-gradient",
          },
        ],
        image: tripguide,
        source_code_link: "https://github.com/",
      },
  ];
  
  export { services, technologies, experiences, projects };