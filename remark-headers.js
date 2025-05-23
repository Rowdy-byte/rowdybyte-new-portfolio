import { visit } from "unist-util-visit";

export const remarkHeaders = () => {
    return (tree, file) => {
        file.data.headers = []

        visit(tree, 'heading', (node) => {
            if (node.depth === 2) {
                file.data.headers.push(node.children[0].value)
            }
        })
        if (!file.data.fm) file.data.fm = {}
        file.data.fm.headers = file.data.headers
    }
}