const caseInsensitiveAttributes = {
    autocomplete: ['form'],
    charset: ['meta', 'script'],
    contenteditable: null,
    crossorigin: ['audio', 'img', 'link', 'script', 'video'],
    dir: null,
    draggable: null,
    dropzone: null,
    formmethod: ['button', 'input'],
    inputmode: ['input', 'textarea'],
    kind: ['track'],
    method: ['form'],
    preload: ['audio', 'video'],
    referrerpolicy: ['a', 'area', 'iframe', 'img', 'link'],
    sandbox: ['iframe'],
    spellcheck: null,
    scope: ['th'],
    shape: ['area'],
    sizes: ['link'],
    step: ['input'],
    translate: null,
    type: [
        'a',
        'link',
        'button',
        'embed',
        'object',
        'script',
        'source',
        'style',
        'input',
        'menu',
        'menuitem'
    ],
    wrap: ['textarea']
};

export default function normalizeAttributeValues(tree) {
    tree.walk(node => {
        if (!node.attrs) {
            return node;
        }

        Object.entries(node.attrs).forEach(([attrName, attrValue]) => {
            const attrNameLower = attrName.toLowerCase();
            if (
                Object.hasOwnProperty.call(caseInsensitiveAttributes, attrNameLower)
                && (
                    caseInsensitiveAttributes[attrNameLower] === null
                    || caseInsensitiveAttributes[attrNameLower].includes(node.tag)
                )
            ) {
                node.attrs[attrName] = attrValue.toLowerCase ? attrValue.toLowerCase() : attrValue;
            }
        });

        return node;
    });

    return tree;
}
