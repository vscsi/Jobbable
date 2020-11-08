exports.getSkilltag = async (req, res, next) => {

    let skilltag = await knex.from('skilltag').select();

    

    res.render('/users/profile', {
        pageTitle: 'User profile',
        skilltag: skilltag
    })


}