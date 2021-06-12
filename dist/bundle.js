var O=Object.create;var d=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var j=Object.getOwnPropertyNames;var P=Object.getPrototypeOf,E=Object.prototype.hasOwnProperty;var v=t=>d(t,"__esModule",{value:!0});var b=(t,e,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of j(e))!E.call(t,s)&&s!=="default"&&d(t,s,{get:()=>e[s],enumerable:!(o=S(e,s))||o.enumerable});return t},c=t=>b(v(d(t!=null?O(P(t)):{},"default",t&&t.__esModule&&"default"in t?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t);var N=c(require("cac"));var i=c(require("fs")),u=c(require("path")),y=c(require("inquirer"));var r=t=>(...e)=>`[${t}m${e.join(" ")}[0m`,a={black:r("30"),red:r("31"),green:r("32"),yellow:r("33"),blue:r("34"),magenta:r("35"),cyan:r("36"),white:r("37")};var D=async t=>{let e=w(t.templatesDir),o=[!t.outputFileName&&{type:"input",message:"What's outputFileName.",name:"outputFileName",default:"index"},{type:"list",name:"template",message:"Choose a template.",choices:e}].filter(Boolean),s=await C(t,o),n=u.join(t.templatesDir,s.template),l=$(n,s.outputDir,s.outputFileName);q(l),console.log("");let p=k(l);if(0<p.length){let h=`Error: The file already exists. Please remove ${p.filter(Boolean).join(" and ")}.`;console.error(a.red(h)),process.exit(1)}A(l)};async function C(t,e){let o=JSON.parse(JSON.stringify(t));return await(0,y.prompt)(e).then(s=>{s.outputFileName&&(o.outputFileName=s.outputFileName),o.template=s.template}),o}function w(t){return i.readdirSync(t).filter(e=>{let o=u.join(t,e);return i.statSync(o).isDirectory()})}function $(t,e,o){return i.readdirSync(t).filter(n=>{let l=u.join(t,n);return i.statSync(l).isFile()}).reduce((n,l)=>{let p=u.join(t,l),f=p.split("/"),g=f[f.length-1],F=g.indexOf("."),h=g.substring(F),x=i.readFileSync(p,"utf-8");return n.push({path:u.join(e,o+h),data:x.replace(/\$FILE_NAME/g,o)}),n},[])}function q(t){let e=t[0].path.split("/").filter((o,s,n)=>s!==n.length-1).join("/");e&&i.mkdirSync(e,{recursive:!0})}function k(t){return t.map(e=>e.path).map(e=>i.existsSync(e)&&e).filter(e=>e)}function A(t){t.forEach(e=>{i.writeFileSync(e.path,e.data,"utf-8"),console.log(a.green("\u2728  Create file",e.path))})}var m=(0,N.default)();m.command("[name]").option("-o, --output-dir <path>","selected outputDir",{default:"./"}).option("-t, --templates-dir <path>","Selected templates dir",{default:"./templates"}).action(async(t,e)=>{let o={templatesDir:e.templatesDir,template:"",outputDir:e.outputDir,outputFileName:t};console.log(a.cyan("Options:")),console.log(a.cyan("- outputDir:",o.outputDir)),console.log(a.cyan("- templatesDir:",o.templatesDir)),o.outputFileName&&console.log(a.cyan("- outputFileName:",o.outputFileName)),console.log(""),await D(o)});m.help();m.version("0.1.5");m.parse();
