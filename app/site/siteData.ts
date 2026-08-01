export type PageKey="home"|"about"|"work"|"take-five"|"stories"|"support";
export const nav=[
  ["About","/about"],["Selected Work","/work"],["Playground","/stories"],["Process","/take-five"],["Contact","/support"]
] as const;
export const pages={
  about:{index:"01",kicker:"ABOUT ME",title:"A little about me, how I think, and what I care about.",intro:"[Add a short introduction about your background, interests, and the kind of work you want to create.]",color:"red"},
  work:{index:"02",kicker:"SELECTED WORK",title:"A selection of projects, problems, and outcomes.",intro:"[Introduce your strongest projects and the value you contributed to each one.]",color:"yellow"},
  "take-five":{index:"04",kicker:"MY PROCESS",title:"How an idea moves from question to working experience.",intro:"[Describe how you research, explore, design, build, test, and refine your work.]",color:"pink"},
  stories:{index:"03",kicker:"PLAYGROUND",title:"Motion studies, interface experiments, and unfinished ideas.",intro:"[Use this space for animation tests, components, prototypes, and things you are learning.]",color:"blue"},
  support:{index:"05",kicker:"CONTACT",title:"Have an idea? Let's make something useful together.",intro:"[Add your email, availability, location, and the best way for people to contact you.]",color:"black"}
} as const;
