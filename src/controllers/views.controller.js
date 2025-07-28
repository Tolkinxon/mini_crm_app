import { globalError } from "shokhijakhon-error-handler";
import { groups } from "../model/groups.js"
import { students } from "../model/students.js";

export default {
    GROUPS: async (req, res) => {
        const data = await groups()
        res.render('index', {data})
    },
    STUDENTS: async function(req, res){
        try{
            let teacherId = parseInt(req.query.teacherId) || 0;
            let groupId = parseInt(req.query.groupId) || 0;
            let data = await students(teacherId, groupId);
            console.log(data);
            
            return res.render("index", {data})
        }catch(err){
            return globalError(err, res);
        }
    }
}