export default {
    INDEX: async (req, res) => {
        res.render('index',  {table: {
											N: 2,
											ism: [ {type: 'link', text: "Farxod", href: '/hello'}, {type: 'link', text: "Doniyor", href: '/hello'} ],
											familya: [ {type: 'link', text: "Mannopov", href: '/hello'}, {type: 'link', text: "Nasriddinov", href: '/hello'} ]
									  }})
    }
}