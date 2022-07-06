class TaskHepper {
    formatePopulateQuery = (query, path) => {
        const match = {};
        const sort = {};
        if (query.sortBy) {
            const sortParts = query.sortBy.split(":");
            sort[sortParts[0]] = sortParts[1] === "des" ? -1 : 1;
        }
        if (query.completed) {
            match.completed = query.completed === "true";
        }
        const options = {
            sort,
            limit: parseInt(query.limit),
            skip: parseInt(query.skip),
        };
        return {
            path,
            match,
            options,
        };
    };
}
module.exports = new TaskHepper();
