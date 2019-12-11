/* eslint-disable new-cap */
const Express = require('express');
const Mongoose = require('mongoose');
const BodyParser = require('body-parser');

const app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
// Define REST API
app.listen(3000, () => {
    console.log('Listening at :3000...');
});
Mongoose.connect('mongodb://localhost/productlinks');

const storeModel = Mongoose.model('store', {
    name: {
        type: String,
    }
});
const teamModel = Mongoose.model('team', {
    name: {
        type: String,
    },
    store_id: {
        type: String,
    }
});
const memberModel = Mongoose.model('member', {
    fullname: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    team_id: {
        type: String,
    }

});
const tagModel = Mongoose.model('tag', {
    name: {
        type: String,
    },
    member_id: {
        type: String,
    }
});
const linkTagModel = Mongoose.model('linktag', {
    tag_id: {
        type: String,
    },
    link_id: {
        type: String,
    }
});
const linkModel = Mongoose.model('link', {
    root_link: {
        type: String,
    },
    sort_link: {
        type: String,
    },
    domain_id: {
        type: String,
    },
    member_id: {
        type: String,
    }
});
const domainModel = Mongoose.model('domain', {
    domain: {
        type: String,
    },
    member_id: {
        type: String,
    }
});

// CRUD store
app.post('/store/create', async (req, res) => {
    if (req.body.name) {
        const nameStore = req.body.name;
        const store = new storeModel({
            name: nameStore,
        });
        store.save((err) => {
            if (err)
                return res.status(400).json(err);
            return res.status(200).json(store);
        }); 
    } else {
        return res.json('name not null');
    }
});

app.get('/store/list', async (req, res) => {
    const items = await storeModel
        .find({}, {},
            (err, data) => {
                if (err)
                    return null;
                return data;
            });
    const data = {
        code: '200',
        items: items,
    };
    return res.status(200).json(data);
});

// CRUD team
app.post('/team/create', async (req, res) => {
    if (req.body.name) {
        const nameTeam = req.body.name;
        const storeID = req.body.store_id;
        const team = new teamModel({
            name: nameTeam,
            store_id: storeID,
        });
        team.save((err) => {
            if (err)
                return res.status(400).json(err);
            return res.status(200).json(team);
        });
    } else {
        return res.json('name null');
    }
});

app.get('/team/list', async (req, res) => {
    const items = await teamModel
        .find({}, {},
            (err, data) => {
                if (err)
                    return null;
                return data;
            });
    const data = {
        code: '200',
        items: items,
    };
    return res.status(200).json(data);
});

// CRUD member
app.post('/member/create', async (req, res) => {
    if (req.body.fullname) {
        const fullName = req.body.fullname;
        const phoneMember = req.body.phone;
        const emailMember = req.body.email;
        const teamID = req.body.team_id;
        const member = new memberModel({
            fullname: fullName,
            phone: phoneMember,
            email: emailMember,
            team_id: teamID,
        });
        member.save((err) => {
            if (err)
                return res.status(400).json(err);
            return res.status(200).json(member);
        });
    }
    else {
        return res.json('fullname not null');
    }

});
app.get('/member/list', async (req, res) => {
    const items = await memberModel
        .find({}, {},
            (err, data) => {
                if (err)
                    return null;
                return data;
            });
    const data = {
        code: '200',
        items: items,
    };
    return res.status(200).json(data);
});

// CRUD taglink
app.post('/link-tag/create', async (req, res) => {
    const tagID = req.body.tag_id;
    const linkID = req.body.link_id;
    const linkTag = new linkTagModel({
        tag_id: tagID,
        link_id: linkID,
    });
    linkTag.save((err) => {
        if (err)
            return res.status(400).json(err);
        return res.status(200).json(linkTag);
    });
});

// CRUD tag
app.post('/tag/create', async (req, res) => {
    if (req.body.name) {
        const nameTag = req.body.name;
        const memberID = req.body.member_id;
        const tag = new tagModel({
            name: nameTag,
            member_id: memberID,
        });
        tag.save((err) => {
            if (err)
                return res.status(400).json(err);
            return res.status(200).json(tag);
        });
    } else {
        return res.json('name not null');
    }
});

app.get('/tag/list', async (req, res) => {
    const items = await tagModel
        .find({}, {},
            (err, data) => {
                if (err)
                    return null;
                return data;
            });
    const data = {
        code: '200',
        items: items,
    };
    return res.status(200).json(data);
});

app.get('/tag/show', async (req, res) => {
    const tagID = req.body.id;
    const data = await tagModel.find({ _id: tagID }, (err, tag) => {
        if (err)
            return res.status(404).json(err);
        return tag;
    });
    res.status(200).json(data);
});

app.post('/tag/update', async (req, res) => {
    const tagID = req.body.id;
    const input = {};
    if (req.body.name) {
        input.name = req.body.name;
    }
    if (req.body.member_id) {
        input.member_id = req.body.member_id;
    }
    const data = await tagModel.update({ _id: tagID }, { $set: input }, (err, tag) => {
        if (err)
            return res.status(404).json(err);
        return tag;
    });
    res.json(data);
});

app.post('/tag/delete', async (req, res) => {
    const tagID = req.body.id;
    tagModel.remove({ _id: tagID }, (err, tag) => {
        if (err)
            return res.json(err);
        return res.json('Successfully removed _id ' + tag._id);
    });
});

// CRUD link
app.post('/link/create', async (req, res) => {
    if (req.body.root_link) {
        const rootLink = req.body.root_link;
        const sortLink = req.body.sort_link;
        const memberID = req.body.member_id;
        const domainID = req.body.domain_id;
        const link = new linkModel({
            root_link: rootLink,
            sort_link: sortLink,
            member_id: memberID,
            domain_id: domainID,
        });

        link.save((err) => {
            if (err)
                return res.status(400).json(err);
            return res.status(200).json(link);
        });
    } else {
        return res.json('rootlink not null');
    }
});

app.get('/link/list', async (req, res) => {
    const conditions = {};
    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);
    const sort = {};
    sort[req.body.sortby] = req.body.orderby === 'desc' ? -1 : 1;
    const query = {};

    if (page < 0 || page === 0) {
        const response = { error: true, message: 'page >1' };
        return res.json(response);
    }

    if (req.body.keyword) {
        const keywordSearch = req.body.keyword;
        conditions.root_link = { $regex: keywordSearch, $options: 'i' };
    }

    if (req.body.tags) {
        const strTags = req.body.tags;
        const stringTags = strTags.split(',');
        const tag = await tagModel.find({ name: { $in: stringTags } }, { id_: 1 }, (err, data) => {
            if (err) {
                return 0;
            }
            return data;
        });
        const arraytagID = [];
        for (let i = 0; i < tag.length; i++) {
            arraytagID.push(tag[i]._id);
        }
        const link = await linkTagModel.find({ tag_id: { $in: arraytagID } }, { link_id: 1, _id: 0 }, (err, data) => {
            if (err) {
                return 0;
            }
            return data;
        });

        const arraylinkID = [];
        for (let i = 0; i < link.length; i++) {
            arraylinkID.push(link[i].link_id);
        }
        conditions._id = {
            $in: arraylinkID
        };
    }

    if (req.body.domain) {
        const domainID = req.body.domain;
        const stringDomains = domainID.split(',');
        conditions.domain_id = {
            $in: stringDomains
        };
    }

    query.skip = limit * (page - 1);
    query.limit = limit;
    const total = await linkModel.count(conditions, (err, data) => {
        if (err) {
            return 0;
        }
        return data;
    });

    const items = await linkModel
        .find(conditions, {},
            query,
            (err, data) => {
                if (err)
                    return null;
                return data;
            })
        .sort(sort);

    const data = {
        total: total,
        limit: limit,
        code: '200',
        items: items,

    };
    res.status(200).json(data);
});

app.get('/link/show', async (req, res) => {
    const linkID = req.body.id;
    const data = await linkModel.find({ _id: linkID }, (err, link) => {
        if (err)
            res.status(404).json(err);
        return link;
    });
    res.status(200).json(data);
});

app.post('/link/update', async (req, res) => {
    const linkID = req.body.id;
    const inputLink = {};
    if (req.body.root_link) {
        inputLink.root_link = req.body.root_link;
    }
    if (req.body.member_id) {
        inputLink.member_id = req.body.member_id;
    }
    if (req.body.domain_id) {
        inputLink.domain_id = req.body.domain_id;
    }
    const data = await linkModel.update({ _id: linkID }, { $set: inputLink }, { new: true }, (err, link) => {
        if (err)
            return res.status(404).json(err);
        return link;
    });
    res.status(200).json(data);
});
app.post('/link/delete', async (req, res) => {
    const linkID = req.body.id;
    linkModel.remove({ _id: linkID }, (err, link) => {
        if (err)
            return res.status(404).json(err);
        return res.status(200).json('Successfully removed id: ' + link._id);
    });
});
// CRUD domain
app.post('/domain/create', async (req, res) => {
    if (req.body.domain) {
        const nameDomain = req.body.domain;
        const memberID = req.body.member_id;
        const domain = new domainModel({
            domain: nameDomain,
            member_id: memberID,
        });
        domain.save((err) => {
            if (err)
                return res.status(400).json(err);
            return res.status(200).json(domain);
        });
    } else {
        return res.json('domain not null');
    }
});
app.get('/domain/list', async (req, res) => {
    const items = await domainModel
        .find({}, {},
            (err, data) => {
                if (err)
                    return null;
                return data;
            });
    const data = {
        code: '200',
        items: items,
    };
    return res.status(200).json(data);
});

app.get('/domain/show', async (req, res) => {
    const domainID = req.body.id;
    const data = await domainModel.find({ _id: domainID }, (err, domain) => {
        if (err)
            return res.status(404).json(err);
        return domain;
    });
    res.status(200).json(data);
});

app.post('/domain/update', async (req, res) => {
    const domainID = req.body.id;
    const input = {};
    if (req.body.domain) {
        input.domain = req.body.domain;
    }
    if (req.body.member_id) {
        input.member_id = req.body.member_id;
    }
    const data = await domainModel.update({ _id: domainID }, { $set: input }, (err, domain) => {
        if (err)
            return res.status(404).json(err);
        return domain;
    });
    res.json(data);
});

app.post('/tag/delete', async (req, res) => {
    const domainID = req.body.id;
    domainModel.remove({ _id: domainID }, (err, domain) => {
        if (err)
            return res.json(err);
        return res.json('Successfully removed _id ' + domain._id);
    });
});
