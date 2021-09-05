const mongoose = require('mongoose');
const Post = mongoose.model('Post');

const { GITHUB_USERNAME, GITHUB_PASSWORD, GITHUB_TOKEN } = process.env;

const GitHub = require('github-api');

module.exports = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });

                return posts;
            } catch (err) {
                throw new Error(err.message);
            }
        },
        getRepos: async () => {
            try {
                const gh = new GitHub({
                    username: GITHUB_USERNAME,
                    password: GITHUB_PASSWORD,
                    token: GITHUB_TOKEN
                });

                const me = gh.getUser();

                const fetched = await me.listRepos({
                    sort: 'created'
                });
                const repos = [];
                fetched.data.forEach(repo => {
                    repos.push({
                        id: repo.id,
                        name: repo.name,
                        description: repo.description,
                        url: repo.html_url,
                        lang: repo.language,
                        createdAt: repo.created_at,
                        updatedAt: repo.updated_at,
                        pushedAt: repo.pushed_at,
                        archived: repo.archived,
                        private: repo.private,
                        fork: repo.fork,
                    });
                });

                return repos;
            } catch (err) {
                console.error(err.message);
                throw new Error(err.message);
            }
        }
    }
};