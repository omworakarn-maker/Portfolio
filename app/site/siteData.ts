export type PageKey="home"|"about"|"work"|"playground"|"contact";
export const nav=[
  ["About","/about"],["Selected Work","/work"],["Playground","/playground"],["Contact","/contact"]
] as const;
export const pages={
  about:{index:"01",kicker:"ABOUT ME",title:"A little about me, how I think, and what I care about.",intro:"[Add a short introduction about your background, interests, and the kind of work you want to create.]",color:"red"},
  work:{index:"02",kicker:"SELECTED WORK",title:"A selection of projects, problems, and outcomes.",intro:"A selection of digital products and experiments—shaped from a first idea into clear, useful experiences people can enjoy.",color:"yellow"},
  playground:{index:"03",kicker:"PLAYGROUND",title:"Motion studies, interface experiments, and unfinished ideas.",intro:"[Use this space for animation tests, components, prototypes, and things you are learning.]",color:"blue"},
  contact:{index:"04",kicker:"CONTACT",title:"Have an idea? Let's make something useful together.",intro:"Based in Thailand and available for freelance projects, collaborations, and thoughtful digital experiments. The easiest way to reach me is through the contact form below.",color:"black"}
} as const;
