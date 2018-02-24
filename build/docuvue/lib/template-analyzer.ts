import * as htmlparser2 from 'htmlparser2';
import { SearchRegEx } from './constants';


export interface Slot {
  name: string;
  description: string;
}

export interface SlotMap {
  [slotName: string]: Slot;
}

export class DocuVueTemplateAnalyzer {

  getSlots(template = ''): SlotMap {
    const output: SlotMap = {};
    let lastComment: string|null = null;

    const parser = new htmlparser2.Parser({
      oncomment: data => {
        if (data.search(SearchRegEx.slot) !== -1) {
          lastComment = data.replace('@slot', '').trim();
        }
      },
      ontext: text => {
        if (text.trim()) {
          lastComment = null;
        }
      },
      onopentag: (name, attrs) => {
        if (name === 'slot') {
          const slotName = attrs.name || 'default';
          output[slotName] = {
            name: slotName,
            description: lastComment || ''
          };

          lastComment = null;
        }
      }
    });

    parser.write(template);
    parser.end();
    return output;
  }
}
