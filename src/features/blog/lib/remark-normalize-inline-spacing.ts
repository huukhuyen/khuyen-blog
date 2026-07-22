type MarkdownNode = {
  children?: MarkdownNode[];
  type: string;
  value?: string;
};

const inlineNodeTypes = new Set(["emphasis", "inlineCode", "link", "strong"]);
const openingDelimiters = new Set(["(", "[", "{", '"', "'", "“", "‘"]);
const closingPunctuation = new Set([
  ")",
  "]",
  "}",
  ",",
  ".",
  ":",
  ";",
  "!",
  "?",
  '"',
  "'",
  "”",
  "’",
]);

function getFirstCharacter(node: MarkdownNode): string | undefined {
  if (node.value) return node.value[0];
  return node.children?.map(getFirstCharacter).find(Boolean);
}

function getLastCharacter(node: MarkdownNode): string | undefined {
  if (node.value) return node.value.at(-1);
  if (!node.children) return undefined;

  for (let index = node.children.length - 1; index >= 0; index -= 1) {
    const character = getLastCharacter(node.children[index]);
    if (character) return character;
  }

  return undefined;
}

function needsSpace(left: MarkdownNode, right: MarkdownNode): boolean {
  if (!inlineNodeTypes.has(left.type) && !inlineNodeTypes.has(right.type)) {
    return false;
  }

  const lastCharacter = getLastCharacter(left);
  const firstCharacter = getFirstCharacter(right);
  if (!lastCharacter || !firstCharacter) return false;
  if (/\s/u.test(lastCharacter) || /\s/u.test(firstCharacter)) return false;
  if (openingDelimiters.has(lastCharacter)) return false;
  return !closingPunctuation.has(firstCharacter);
}

function normalizeChildren(node: MarkdownNode): void {
  node.children?.forEach(normalizeChildren);
  if (!node.children) return;

  for (let index = 0; index < node.children.length - 1; index += 1) {
    const left = node.children[index];
    const right = node.children[index + 1];
    if (!needsSpace(left, right)) continue;

    node.children.splice(index + 1, 0, { type: "text", value: " " });
    index += 1;
  }
}

export function remarkNormalizeInlineSpacing(): (tree: MarkdownNode) => void {
  return normalizeChildren;
}
