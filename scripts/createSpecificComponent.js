const fs = require("fs");
const path = require("path");
const NAME = process.argv[2];

if (!NAME) {
  console.error("Please provide the name for the UI component.");
  process.exit(1);
}

//helper//
const toCamelCase = (str) => {
  // Check if the input string contains spaces, special characters, or numbers
  if (/\s/.test(str)) {
    console.error("No spaces allowed");
    process.exit(1);
  }
  if (/[^a-zA-Z]/.test(str)) {
    console.error("Special characters not allowed");
    process.exit(1);
  }
  if (/\d/.test(str)) {
    console.error("Numbers not allowed");
    process.exit(1);
  }

  // Convert the string to camel case
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() + "Component";
};

const componentName = toCamelCase(NAME);

const COMPONENT_FILE_CONTENT = `

interface ${componentName}Props {
    //add your types here//
}

export const ${componentName}: React.FC = () => {
    
    //modify your content here//
    return <div>${componentName}</div>
}

`;

const INDEX_FILE_CONTENT = `\nexport {${componentName}} from "./${componentName}"`;

const componentsDir = path.join(__dirname, "..", "src", "components");
const specificDir = path.join(componentsDir, "specific");
const componentPath = path.join(specificDir, componentName);
const indexPath = path.join(specificDir, "index.ts");

console.log(
  componentsDir,
  "\n",
  specificDir,
  "\n",
  componentPath,
  "\n",
  indexPath
);

try {
  // Check if the components directory exists, if not, create it
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir);
    console.log(`Components directory created: ${componentsDir}`);
  }

  // Check if the ui directory exists inside components, if not, create it
  if (!fs.existsSync(specificDir)) {
    fs.mkdirSync(specificDir);
    console.log(
      `"specific" directory created inside components: ${specificDir}`
    );
  }

  // Create the directory for the component
  fs.mkdirSync(componentPath);
  console.log(`specific component directory created: ${componentPath}`);

  // Create index.tsx file
  fs.writeFileSync(
    path.join(componentPath, "index.tsx"),
    COMPONENT_FILE_CONTENT
  );

  // Create styled.tsx file
  fs.writeFileSync(
    path.join(componentPath, "styled.tsx"),
    `import styled from '@mui/system';\n\n// Define your styled components here\n`
  );

  // Append export statement to index.tsx
  fs.appendFileSync(indexPath, INDEX_FILE_CONTENT);

  console.log(
    `"specific" component files created successfully in ${componentPath}`
  );
} catch (error) {
  console.error("Error creating specific component:", error);
}

console.log(componentName);
console.log(COMPONENT_FILE_CONTENT);
console.log(INDEX_FILE_CONTENT);
