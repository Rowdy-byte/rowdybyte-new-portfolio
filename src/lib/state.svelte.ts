let navIsOpen = $state(false);

export function getNavIsOpen() {
    function toggle() {
        navIsOpen = !navIsOpen;
    }
    return {
        get navIsOpen() {
            return navIsOpen
        },
        toggle
    };

}

let sidebarIsOpen = $state(false);

export function getSidebarIsOpen() {
    function toggle() {
        sidebarIsOpen = !sidebarIsOpen;
    }
    return {
        get sidebarIsOpen() {
            return sidebarIsOpen
        },
        toggle
    };

}

let count = $state(0)

export function getArticleCount() {
    function increaseCount(arg: number) {
        count = arg
    }
    return {
        get count() {
            return count
        },
        increaseCount
    }
}