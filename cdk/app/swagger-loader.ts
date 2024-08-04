import * as YAML from 'yaml';
import * as fs from 'fs';
import * as path from 'path';

export const load = () => 
  YAML.parse(fs.readFileSync(path.resolve(__dirname,"./swagger.yml")).toString())
