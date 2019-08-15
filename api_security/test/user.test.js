require('babel-polyfill');

import supertest from 'supertest';
import server from '../src/config/server';

describe('Testing User endpoint', () => {
    describe('User | LOGIN - GET', () => {
        after(done => {
            done();
        });
    })
    it('Status 200 OK', done => {
        supertest(server)
            .get('/api/public/login')
            .set('useremail', 'admin@email.com')
            .set('userpassword', 'admin123')
            .expect(200)
            .end((err, res) => {
                console.log(err);
                done(err)
            })
    })
    it('Status 401 UNAUTHORIZED', done => {
        supertest(server)
            .get('/api/public/login')
            .set('useremail', 'admin@email.co')
            .set('userpassword', 'admin12')
            .expect(401)
            .end((err, res) => {
                console.log(err);
                done(err)
            })
    })

    describe('User | TOKEN - GET', () => {
        after(done => {
            done();
        });
    })
    it('Status 200 OK', done => {
        supertest(server)
            .get('/api/token')
            .set('Authentication', '1e073c67071756ade751c0dfae171560:b8e6832c7f3a75d47b513f3d87b776964f26c3c41de9b9f4f030c5f0dd397f56193ad5323569af0c2ba6f48d5c98dd036542f6fe07081380099a17ed101d1033cfd314b35cbc69a2fbe0249bc5c7884fca73924560b17df48b9db83506d5823db53fa3d5d548de7ab4f4954266b07f90ca691f2f51f0965e9234a2e7c7ba910a459aed4a30d21a9fec21bd3451cca822aba314ccd93097b1acdcbe87289b0afd1b3bcf3a17cfdada35a03d39dc8d1ec78a5a4b5d0dbf93002bd1e13274fbcc36e7ed843b64501647d5e098c16b5a91f36a9c50b42b1d19133a1fade1dc18f63f922ad3d1d4e99d2d23092265cab984a38414e5398f95172be5ae652e7f3fea7a46d0ae98c28911ba09c623a5e97dda6a0a1411817c8aa7db32d6d6eea9332e7d7b294e825b234e1c21c4a814e649e6b13d7ab9b354f332bf95887fb70a5289d1b9d13ee5d35468b3a9bc0f4778fb109320f70c9bf4cb327791e30155fa8d9b845dcf1977eb4b93bb3bc6e9b1fa3a3c79189c68417922e64581e1da898459d1af4f20938557259c95c7331c477e2b61379c81bd12840e93593c9740b96a03a8a977cd766820309e6b06f6419f5fefc46833bcd3fad8d51c22b105d5f5fd3e119f0774014e61511366213141a4c46470ec1890b0323c2b2c469adb45375f79ad6aa6797bd392c10c133f3060ff490012f5a21ae3a3caf447230e97f15cbd6b697184456f0b60d07c188f7d41156cb705a583782df4d8fa705ffc03186b12ac6591befdb69ff0e59e08481eb39415c3d0bfd689b717fc71f38e7c1d954113d9db0628ec9cb2ced2f88100758f490e03050303720fd32a758e4ce3815ccf0efe2c62d706ea3be6632f05ddbf351ad9202e0d43cc12a67f1f8b134a72c62cc23e565e30deca0c51f60b29f92741c17c56a8cc85ea6b93e5c0f13ae91b360fa9b41d2fef3b8b457e6ee8532554b60b1da1aa8cc5c9c991f096dde9e93cf691b38fbe50f7d969df5de4ff3729d1ee585d082c54')
            .expect(200)
            .end((err, res) => {
                console.log(err);
                done(err)
            })
    })
    it('Status 401 BAD REQUEST', done => {
        supertest(server)
            .get('/api/token')
            .set('Authentication', 'wrongtokensenttotheserver')
            .expect(400)
            .end((err, res) => {
                console.log(err);
                done(err)
            })
    })

})