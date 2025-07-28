import { groups } from "../model/groups.js"

export default {
    INDEX: async (req, res) => {
        const data = await groups()
        res.render('index', {data})
    }
}