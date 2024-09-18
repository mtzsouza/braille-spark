export function translateToBraille(text: string): string {
    const brailleDict: { [key: string]: string } = {
        // Numbers
        'number-indicator': '⠼', // This character goes before a group of numbers
        '1': '⠁',
        '2': '⠃',
        '3': '⠉',
        '4': '⠙',
        '5': '⠑',
        '6': '⠋',
        '7': '⠛',
        '8': '⠓',
        '9': '⠊',
        '0': '⠚',

        // Latin Characters
        'letter-indicator': '⠰',
        'a': '⠁',
        'b': '⠃',
        'c': '⠉',
        'd': '⠙',
        'e': '⠑',
        'f': '⠋',
        'g': '⠛',
        'h': '⠓',
        'i': '⠊',
        'j': '⠚',
        'k': '⠅',
        'l': '⠇',
        'm': '⠍',
        'n': '⠝',
        'o': '⠕',
        'p': '⠏',
        'q': '⠟',
        'r': '⠗',
        's': '⠎',
        't': '⠞',
        'u': '⠥',
        'v': '⠧',
        'w': '⠺',
        'x': '⠭',
        'y': '⠽',
        'z': '⠵',
        
        // Arabic Characters
        'ا': '⠁',
        'ب': '⠃',
        'ت': '⠉',
        'ث': '⠛',
        'ج': '⠙',
        'ح': '⠑',
        'خ': '⠹',
        'د': '⠙',
        'ذ': '⠑',
        'ر': '⠗',
        'ز': '⠵',
        'س': '⠎',
        'ش': '⠱',
        'ص': '⠡',
        'ض': '⠫',
        'ط': '⠱',
        'ظ': '⠳',
        'ع': '⠪',
        'غ': '⠹',
        'ف': '⠋',
        'ق': '⠟',
        'ك': '⠅',
        'ل': '⠇',
        'م': '⠍',
        'ن': '⠝',
        'ه': '⠓',
        'و': '⠺',
        'ي': '⠽',
        'ة': '⠸⠲',
        'أ':'⠌',
        'إ': '⠨',
        '؛': '⠰',
        '،': '⠐',
        'آ': '⠜',
        'ؤ': '⠳',
        'ئ': '⠊',
        'ى': '⠕',
        
        // Symbols
        ' ': '⠀',  // Braille space character
        '.': '⠲',
        ',': '⠂',
        ';': '⠆',
        ':': '⠒',
        '!': '⠮',
        '?': '⠦',
        "'": '⠄',
        '"': '⠦⠴',
        '-': '⠤',
        '/': '⠸⠌',
        '(': '⠶⠂',
        ')': '⠶⠆',
        '[': '⠦⠶⠂',
        ']': '⠦⠶⠆',
        '{': '⠦⠶⠲',
        '}': '⠦⠶⠦',
        '&': '⠈⠯',
        '*': '⠔',
        '_': '⠸⠤',
        '+': '⠬',
        '=': '⠐⠤',
        '<': '⠦⠣',
        '>': '⠦⠜',
        '|': '⠦⠳',
        '\\':'⠦⠸⠌', // Backslash
        '%': '⠸⠴⠦',
    };
    
    text = text.toLowerCase();
    let brailleText = '';
    let ptr: number = 0;
    while (ptr < text.length) {
        // If current char is whitespace, add blank char
        const whitespaceChars = ' \u00A0\u2002\u2003\u2009\u200B\u2029\u000A\u000D\u0085';
        if (whitespaceChars.includes(text[ptr])) {

            // If char is newline, add newline instead of blank
            if (text[ptr] == '\n') {
                brailleText += '\n'
                ptr += 1;
                continue;
            }

            brailleText += brailleDict[' '];
            ptr += 1;
            continue;
        }

        // If current char is a number, add number indicator
        if ('0' <= text[ptr] && text[ptr] <= '9') {
            brailleText += brailleDict['number-indicator'];
            // Add subsequent numbers
            while ('0' <= text[ptr] && text[ptr] <= '9') {
                brailleText += brailleDict[text[ptr]] || text[ptr];
                ptr += 1;
            }
        } else {
            // Current char is not a number
            // If previous char was a number, add letter indicator
            if ('0' <= text[ptr - 1] && text[ptr - 1] <= '9') {
                brailleText += brailleDict['letter-indicator'];
            }
            brailleText += brailleDict[text[ptr]] || text[ptr];
            ptr += 1;
        }
    }

    return brailleText;
}