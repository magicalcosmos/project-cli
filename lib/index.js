#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Command } from "commander";
import inquirer from "inquirer";
import { downloadTemplate } from './download';
import { modifyPackageJson } from './modify';
const templateGitUrl = 'http://github.com/terwer/zhi-log';
let downloadPath = null;
const InitPrompts = [
    {
        name: 'description',
        message: 'please input description',
        default: ''
    },
    {
        name: 'author',
        message: 'please input author',
        default: ''
    }
];
const program = new Command();
program
    .name("cosmos")
    .description("application generator, include vue, react, nextjs, angular")
    .version("0.0.1");
program
    .command("init <name>")
    .description("init a cosmos project")
    .action((name, branch) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`start init ${name} project`);
    const feat = branch !== null && branch !== void 0 ? branch : "main";
    console.log("current branch:", feat);
    const initOptions = yield inquirer.prompt(InitPrompts);
    console.log('initOptions', initOptions);
    try {
        downloadPath = `./${name}`;
        yield downloadTemplate(templateGitUrl, downloadPath, feat);
        yield modifyPackageJson(downloadPath, Object.assign({ name }, initOptions));
    }
    catch (error) {
        console.error(error);
    }
}));
program.parse();
//# sourceMappingURL=index.js.map