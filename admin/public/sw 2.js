if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let r={};const t=e=>a(e,i),o={module:{uri:i},exports:r,require:t};s[i]=Promise.all(c.map((e=>o[e]||t(e)))).then((e=>(n(...e),r)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/1149-c5e72183a2de12a5.js",revision:"c5e72183a2de12a5"},{url:"/_next/static/chunks/1277-8b4d022e5b109767.js",revision:"8b4d022e5b109767"},{url:"/_next/static/chunks/1290-b3fe3493428d6625.js",revision:"b3fe3493428d6625"},{url:"/_next/static/chunks/1983-653a7497fde336d2.js",revision:"653a7497fde336d2"},{url:"/_next/static/chunks/2080.05cbb2bc62e15ead.js",revision:"05cbb2bc62e15ead"},{url:"/_next/static/chunks/2144-292af9e0ef1d1b78.js",revision:"292af9e0ef1d1b78"},{url:"/_next/static/chunks/2251-e932e77fdb968dce.js",revision:"e932e77fdb968dce"},{url:"/_next/static/chunks/228771e0-a8d54e70cd38ec86.js",revision:"a8d54e70cd38ec86"},{url:"/_next/static/chunks/2346.cc1f704f51f42cda.js",revision:"cc1f704f51f42cda"},{url:"/_next/static/chunks/2470-ebedb89def4c133a.js",revision:"ebedb89def4c133a"},{url:"/_next/static/chunks/2731.f1427faf13826c29.js",revision:"f1427faf13826c29"},{url:"/_next/static/chunks/276-4e8b1e305a1bab5d.js",revision:"4e8b1e305a1bab5d"},{url:"/_next/static/chunks/2811.00671c1db4f2801d.js",revision:"00671c1db4f2801d"},{url:"/_next/static/chunks/2916.3e07fa82bcacf86a.js",revision:"3e07fa82bcacf86a"},{url:"/_next/static/chunks/329.35e4268a84dd0352.js",revision:"35e4268a84dd0352"},{url:"/_next/static/chunks/3471-3c1a7f798e34927c.js",revision:"3c1a7f798e34927c"},{url:"/_next/static/chunks/3687.3172625956b6be56.js",revision:"3172625956b6be56"},{url:"/_next/static/chunks/4076-8a88ebb02ad8e49c.js",revision:"8a88ebb02ad8e49c"},{url:"/_next/static/chunks/4238.6c3888a9e25507bd.js",revision:"6c3888a9e25507bd"},{url:"/_next/static/chunks/4743.f0c8a433b750597a.js",revision:"f0c8a433b750597a"},{url:"/_next/static/chunks/4941.d084acafd5eed541.js",revision:"d084acafd5eed541"},{url:"/_next/static/chunks/4943-4460e40ed476f91b.js",revision:"4460e40ed476f91b"},{url:"/_next/static/chunks/4985.6618e399a601df42.js",revision:"6618e399a601df42"},{url:"/_next/static/chunks/5059.8438da215719b015.js",revision:"8438da215719b015"},{url:"/_next/static/chunks/5157-9bc5779b37ed01c5.js",revision:"9bc5779b37ed01c5"},{url:"/_next/static/chunks/5329-0f629bf139507d79.js",revision:"0f629bf139507d79"},{url:"/_next/static/chunks/5610-2ad06a2e946e6fba.js",revision:"2ad06a2e946e6fba"},{url:"/_next/static/chunks/5899.9adf8411a7839de9.js",revision:"9adf8411a7839de9"},{url:"/_next/static/chunks/5923.f36f45c45b4dc619.js",revision:"f36f45c45b4dc619"},{url:"/_next/static/chunks/6129-7ce1f414c21ded87.js",revision:"7ce1f414c21ded87"},{url:"/_next/static/chunks/6178-ebdbc5307ae4dcd8.js",revision:"ebdbc5307ae4dcd8"},{url:"/_next/static/chunks/6261-ce690dbf13ae5353.js",revision:"ce690dbf13ae5353"},{url:"/_next/static/chunks/632cba62-d57071ae64b534aa.js",revision:"d57071ae64b534aa"},{url:"/_next/static/chunks/6363.c92f41c7a29615d6.js",revision:"c92f41c7a29615d6"},{url:"/_next/static/chunks/6408-e2009368fc699f99.js",revision:"e2009368fc699f99"},{url:"/_next/static/chunks/65291039-2b98ee4e6275a14f.js",revision:"2b98ee4e6275a14f"},{url:"/_next/static/chunks/6682-4142e01ef35b1322.js",revision:"4142e01ef35b1322"},{url:"/_next/static/chunks/6691-bc800c70049420ef.js",revision:"bc800c70049420ef"},{url:"/_next/static/chunks/6966.ffc70584e68567c6.js",revision:"ffc70584e68567c6"},{url:"/_next/static/chunks/6976.93bd2657ee212927.js",revision:"93bd2657ee212927"},{url:"/_next/static/chunks/6c44d60f.72ef90c447193c81.js",revision:"72ef90c447193c81"},{url:"/_next/static/chunks/7229.b81e5c171934b364.js",revision:"b81e5c171934b364"},{url:"/_next/static/chunks/7300-86306e3e10ff7291.js",revision:"86306e3e10ff7291"},{url:"/_next/static/chunks/7316.ce19e2608c18718e.js",revision:"ce19e2608c18718e"},{url:"/_next/static/chunks/7536-9638bf123dc778e0.js",revision:"9638bf123dc778e0"},{url:"/_next/static/chunks/7557-227492619f10e0ed.js",revision:"227492619f10e0ed"},{url:"/_next/static/chunks/7587.4318f2c2387e3f84.js",revision:"4318f2c2387e3f84"},{url:"/_next/static/chunks/791-139dd15a3ca11e83.js",revision:"139dd15a3ca11e83"},{url:"/_next/static/chunks/8159-4dac30ab78ea2bb7.js",revision:"4dac30ab78ea2bb7"},{url:"/_next/static/chunks/8524.5613ee10aeeb5631.js",revision:"5613ee10aeeb5631"},{url:"/_next/static/chunks/8579-0984a87426aaabe4.js",revision:"0984a87426aaabe4"},{url:"/_next/static/chunks/8640-93829a05aa5fc525.js",revision:"93829a05aa5fc525"},{url:"/_next/static/chunks/8646-d119a7c6bd4c6d0b.js",revision:"d119a7c6bd4c6d0b"},{url:"/_next/static/chunks/8813-4bf1312bc8dda155.js",revision:"4bf1312bc8dda155"},{url:"/_next/static/chunks/8960-927d61bf7e8434b7.js",revision:"927d61bf7e8434b7"},{url:"/_next/static/chunks/8988.ff623c0a0d636b7d.js",revision:"ff623c0a0d636b7d"},{url:"/_next/static/chunks/9491-2457e37770819b23.js",revision:"2457e37770819b23"},{url:"/_next/static/chunks/9549-fb93aea14fef249e.js",revision:"fb93aea14fef249e"},{url:"/_next/static/chunks/9842.7f4c18df49441f48.js",revision:"7f4c18df49441f48"},{url:"/_next/static/chunks/9865-c048d4f019068754.js",revision:"c048d4f019068754"},{url:"/_next/static/chunks/9997-a930d567315aa196.js",revision:"a930d567315aa196"},{url:"/_next/static/chunks/a1b9b43f-4b3cc98531803668.js",revision:"4b3cc98531803668"},{url:"/_next/static/chunks/c9184924-6bd6574c72993663.js",revision:"6bd6574c72993663"},{url:"/_next/static/chunks/framework-847cdbe141f8ae13.js",revision:"847cdbe141f8ae13"},{url:"/_next/static/chunks/main-4d55a68122d2c2e5.js",revision:"4d55a68122d2c2e5"},{url:"/_next/static/chunks/pages/%5Bshop%5D-ea85cd8b0c157d3f.js",revision:"ea85cd8b0c157d3f"},{url:"/_next/static/chunks/pages/%5Bshop%5D/attributes-4ddf5a800196a71e.js",revision:"4ddf5a800196a71e"},{url:"/_next/static/chunks/pages/%5Bshop%5D/attributes/%5BattributeId%5D/edit-ba8860c6d951085e.js",revision:"ba8860c6d951085e"},{url:"/_next/static/chunks/pages/%5Bshop%5D/attributes/create-3f9a8a81011929eb.js",revision:"3f9a8a81011929eb"},{url:"/_next/static/chunks/pages/%5Bshop%5D/edit-d16b854098b16fdb.js",revision:"d16b854098b16fdb"},{url:"/_next/static/chunks/pages/%5Bshop%5D/orders-e0a2e4975dfa222a.js",revision:"e0a2e4975dfa222a"},{url:"/_next/static/chunks/pages/%5Bshop%5D/orders/%5BorderId%5D-fd01c030ba967501.js",revision:"fd01c030ba967501"},{url:"/_next/static/chunks/pages/%5Bshop%5D/products-c7df1bdb2775b9b3.js",revision:"c7df1bdb2775b9b3"},{url:"/_next/static/chunks/pages/%5Bshop%5D/products/%5BproductId%5D/edit-7a2362e8f4781360.js",revision:"7a2362e8f4781360"},{url:"/_next/static/chunks/pages/%5Bshop%5D/products/create-ff0b8f40e8e712cb.js",revision:"ff0b8f40e8e712cb"},{url:"/_next/static/chunks/pages/%5Bshop%5D/staffs-e8736b86295cc524.js",revision:"e8736b86295cc524"},{url:"/_next/static/chunks/pages/%5Bshop%5D/staffs/create-d034f0ff182fc7da.js",revision:"d034f0ff182fc7da"},{url:"/_next/static/chunks/pages/_app-2149d740c1c446a5.js",revision:"2149d740c1c446a5"},{url:"/_next/static/chunks/pages/_error-02cc11fd74b4e5ff.js",revision:"02cc11fd74b4e5ff"},{url:"/_next/static/chunks/pages/attributes-c453418962b2ffcb.js",revision:"c453418962b2ffcb"},{url:"/_next/static/chunks/pages/attributes/%5BattributeId%5D/edit-25788a63e04927de.js",revision:"25788a63e04927de"},{url:"/_next/static/chunks/pages/brands-e1fa3d3728d9cea8.js",revision:"e1fa3d3728d9cea8"},{url:"/_next/static/chunks/pages/brands/%5Bbrandid%5D/edit-484eea45e610c140.js",revision:"484eea45e610c140"},{url:"/_next/static/chunks/pages/brands/create-0e1d8cc401a1dc4d.js",revision:"0e1d8cc401a1dc4d"},{url:"/_next/static/chunks/pages/categories-f6dc53d296487960.js",revision:"f6dc53d296487960"},{url:"/_next/static/chunks/pages/categories/create-b0608f962d972b94.js",revision:"b0608f962d972b94"},{url:"/_next/static/chunks/pages/categories/edit/%5Bid%5D-3ff20c0b15bb722f.js",revision:"3ff20c0b15bb722f"},{url:"/_next/static/chunks/pages/coupons-8dcc04d8e41720d0.js",revision:"8dcc04d8e41720d0"},{url:"/_next/static/chunks/pages/coupons/create-ab3f378796a77ff2.js",revision:"ab3f378796a77ff2"},{url:"/_next/static/chunks/pages/coupons/edit/%5Bid%5D-fc3d4ba9b5beb506.js",revision:"fc3d4ba9b5beb506"},{url:"/_next/static/chunks/pages/forgot-password-22dcc1a189c14ba7.js",revision:"22dcc1a189c14ba7"},{url:"/_next/static/chunks/pages/index-0b68ad7d22594b5b.js",revision:"0b68ad7d22594b5b"},{url:"/_next/static/chunks/pages/invoice-fb3525687e5cedc6.js",revision:"fb3525687e5cedc6"},{url:"/_next/static/chunks/pages/login-36eadc1288013668.js",revision:"36eadc1288013668"},{url:"/_next/static/chunks/pages/logout-f92af317906dc91e.js",revision:"f92af317906dc91e"},{url:"/_next/static/chunks/pages/my-shops-81b44016ef9f95a1.js",revision:"81b44016ef9f95a1"},{url:"/_next/static/chunks/pages/order-status-3df28254dd7c2a04.js",revision:"3df28254dd7c2a04"},{url:"/_next/static/chunks/pages/order-status/create-2d4e454e6dfa91bc.js",revision:"2d4e454e6dfa91bc"},{url:"/_next/static/chunks/pages/order-status/edit/%5Bid%5D-477e70fd624f8044.js",revision:"477e70fd624f8044"},{url:"/_next/static/chunks/pages/orders-1c343d63af00b763.js",revision:"1c343d63af00b763"},{url:"/_next/static/chunks/pages/orders/%5BorderId%5D-7d85195ecd176483.js",revision:"7d85195ecd176483"},{url:"/_next/static/chunks/pages/products-00714785b2ec6f16.js",revision:"00714785b2ec6f16"},{url:"/_next/static/chunks/pages/products/%5BproductId%5D/edit-8a00a207c1f0562a.js",revision:"8a00a207c1f0562a"},{url:"/_next/static/chunks/pages/profile-update-f9fd6c6c64bf879f.js",revision:"f9fd6c6c64bf879f"},{url:"/_next/static/chunks/pages/register-b1dbb2b66d585ebf.js",revision:"b1dbb2b66d585ebf"},{url:"/_next/static/chunks/pages/settings-2f796e6660e0d93c.js",revision:"2f796e6660e0d93c"},{url:"/_next/static/chunks/pages/shippings-23f63438ab430db3.js",revision:"23f63438ab430db3"},{url:"/_next/static/chunks/pages/shippings/create-720cff8073046c0f.js",revision:"720cff8073046c0f"},{url:"/_next/static/chunks/pages/shippings/edit/%5Bid%5D-3b9bf64f646761f5.js",revision:"3b9bf64f646761f5"},{url:"/_next/static/chunks/pages/shops-105a80b7e4673568.js",revision:"105a80b7e4673568"},{url:"/_next/static/chunks/pages/shops/create-d461cfb159f31c48.js",revision:"d461cfb159f31c48"},{url:"/_next/static/chunks/pages/tags-0f27d24989009b8b.js",revision:"0f27d24989009b8b"},{url:"/_next/static/chunks/pages/tags/%5BtagId%5D/edit-f487ef9c6c6ef324.js",revision:"f487ef9c6c6ef324"},{url:"/_next/static/chunks/pages/tags/create-60f6f2a569e6abef.js",revision:"60f6f2a569e6abef"},{url:"/_next/static/chunks/pages/taxes-52357df3bd01f39b.js",revision:"52357df3bd01f39b"},{url:"/_next/static/chunks/pages/taxes/create-3447c3729231eee9.js",revision:"3447c3729231eee9"},{url:"/_next/static/chunks/pages/taxes/edit/%5Bid%5D-cb4f8c7e086e0e78.js",revision:"cb4f8c7e086e0e78"},{url:"/_next/static/chunks/pages/users-c5235266147dab3c.js",revision:"c5235266147dab3c"},{url:"/_next/static/chunks/pages/users/create-42c67a59e6bb0504.js",revision:"42c67a59e6bb0504"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-db5b5f0ea91352bf.js",revision:"db5b5f0ea91352bf"},{url:"/_next/static/css/39d9a2b5cc11e71d.css",revision:"39d9a2b5cc11e71d"},{url:"/_next/static/css/52609041753b5183.css",revision:"52609041753b5183"},{url:"/_next/static/css/9bcc21a117116735.css",revision:"9bcc21a117116735"},{url:"/_next/static/css/a11eea451120c5e8.css",revision:"a11eea451120c5e8"},{url:"/_next/static/css/a4ef56fda630c4e5.css",revision:"a4ef56fda630c4e5"},{url:"/_next/static/css/c0e1a87b9fb9c8e2.css",revision:"c0e1a87b9fb9c8e2"},{url:"/_next/static/css/c6465710a8e89d75.css",revision:"c6465710a8e89d75"},{url:"/_next/static/css/d7280ddb04cb5eb6.css",revision:"d7280ddb04cb5eb6"},{url:"/_next/static/css/f8aee2f66a30e49b.css",revision:"f8aee2f66a30e49b"},{url:"/_next/static/css/fa50cf0224950c12.css",revision:"fa50cf0224950c12"},{url:"/_next/static/eBffkbjh4CwtKwe6TfW03/_buildManifest.js",revision:"a795a17e3b4b8e9a93f22336d97afe57"},{url:"/_next/static/eBffkbjh4CwtKwe6TfW03/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/no-shop.5243ab78.svg",revision:"9813c5d70739486eec6129bfddaad122"},{url:"/_next/static/media/open-sans-all-400-normal.f45bbf0e.woff",revision:"f45bbf0e"},{url:"/_next/static/media/open-sans-all-600-normal.88155beb.woff",revision:"88155beb"},{url:"/_next/static/media/open-sans-all-700-normal.fbefc15e.woff",revision:"fbefc15e"},{url:"/_next/static/media/open-sans-cyrillic-400-normal.78c382a3.woff2",revision:"78c382a3"},{url:"/_next/static/media/open-sans-cyrillic-600-normal.fb4e167c.woff2",revision:"fb4e167c"},{url:"/_next/static/media/open-sans-cyrillic-700-normal.058ac6fe.woff2",revision:"058ac6fe"},{url:"/_next/static/media/open-sans-cyrillic-ext-400-normal.6a6d236f.woff2",revision:"6a6d236f"},{url:"/_next/static/media/open-sans-cyrillic-ext-600-normal.54ca7aeb.woff2",revision:"54ca7aeb"},{url:"/_next/static/media/open-sans-cyrillic-ext-700-normal.cd4eed47.woff2",revision:"cd4eed47"},{url:"/_next/static/media/open-sans-greek-400-normal.6cfbac38.woff2",revision:"6cfbac38"},{url:"/_next/static/media/open-sans-greek-600-normal.1f5152c2.woff2",revision:"1f5152c2"},{url:"/_next/static/media/open-sans-greek-700-normal.da17f754.woff2",revision:"da17f754"},{url:"/_next/static/media/open-sans-greek-ext-400-normal.46d1f7b1.woff2",revision:"46d1f7b1"},{url:"/_next/static/media/open-sans-greek-ext-600-normal.7e1ed1f7.woff2",revision:"7e1ed1f7"},{url:"/_next/static/media/open-sans-greek-ext-700-normal.e32c1bc7.woff2",revision:"e32c1bc7"},{url:"/_next/static/media/open-sans-hebrew-400-normal.ee3553a7.woff2",revision:"ee3553a7"},{url:"/_next/static/media/open-sans-hebrew-600-normal.620af147.woff2",revision:"620af147"},{url:"/_next/static/media/open-sans-hebrew-700-normal.192e528b.woff2",revision:"192e528b"},{url:"/_next/static/media/open-sans-latin-400-normal.55ee70a1.woff2",revision:"55ee70a1"},{url:"/_next/static/media/open-sans-latin-600-normal.07f9d4a5.woff2",revision:"07f9d4a5"},{url:"/_next/static/media/open-sans-latin-700-normal.532b8102.woff2",revision:"532b8102"},{url:"/_next/static/media/open-sans-latin-ext-400-normal.68046e27.woff2",revision:"68046e27"},{url:"/_next/static/media/open-sans-latin-ext-600-normal.5bdbb06a.woff2",revision:"5bdbb06a"},{url:"/_next/static/media/open-sans-latin-ext-700-normal.e0631967.woff2",revision:"e0631967"},{url:"/_next/static/media/open-sans-vietnamese-400-normal.ecb2bf2b.woff2",revision:"ecb2bf2b"},{url:"/_next/static/media/open-sans-vietnamese-600-normal.a6824e10.woff2",revision:"a6824e10"},{url:"/_next/static/media/open-sans-vietnamese-700-normal.c07a29b9.woff2",revision:"c07a29b9"},{url:"/access-denied.svg",revision:"cbef9e3ed2353c751fe2bc0fb2e18636"},{url:"/arrow-next.svg",revision:"c83b96b9c3af5d7d29bf0822b970287b"},{url:"/arrow-previous.svg",revision:"368bfc0612ce03d432495edc17c5b77f"},{url:"/avatar-placeholder.svg",revision:"4f5628d48244291a5613c63171ba4168"},{url:"/favicon.ico",revision:"27e8ee9cbb715425f9c359ea429d1da3"},{url:"/icons/apple-icon-180.png",revision:"987058abfbea9bf108212a8371354cd7"},{url:"/icons/manifest-icon-192.png",revision:"579f68eb102bdf231af0b4fed435a614"},{url:"/icons/manifest-icon-512.png",revision:"86cde7e171259b2a19104bc042458200"},{url:"/image/card-argon.png",revision:"3870fde74e6242af243ffa92bcaeef0d"},{url:"/image/card-helium.png",revision:"c960dd64e795307c42c48e8f244b7ce5"},{url:"/image/card-krypton.png",revision:"173ad5241fb5525926a681f775ab04c4"},{url:"/image/card-neon.png",revision:"3165c5e257f5f5d3f1a61cd4571ef624"},{url:"/image/card-xenon.png",revision:"3d0b5eb11a9ac071a293d54dfcf09634"},{url:"/image/layout-classic.png",revision:"3466c03af75c85989d1aae9b6092d452"},{url:"/image/layout-minimal.png",revision:"6c1970d290749c6e8a1e67b2a682dab9"},{url:"/image/layout-modern.png",revision:"f524fd6d77a95490dea9683845c0a854"},{url:"/image/layout-standard.png",revision:"3a38c5b45aeca63400bbc50454c66a5d"},{url:"/locales/ar/banner.json",revision:"b57f59e73f8bb4ad9426ffcc3d782a9e"},{url:"/locales/ar/common.json",revision:"1158e97a8157fec1d68c66c08c1af00f"},{url:"/locales/ar/form.json",revision:"97b2dfe03e448ca742679863dae431fa"},{url:"/locales/ar/table.json",revision:"a557c1e815c840713f02e2d69ef78b48"},{url:"/locales/ar/widgets.json",revision:"df1e7237fd580f2da453037c7d515137"},{url:"/locales/chawkbazar/ar/banner.json",revision:"b57f59e73f8bb4ad9426ffcc3d782a9e"},{url:"/locales/chawkbazar/ar/common.json",revision:"1158e97a8157fec1d68c66c08c1af00f"},{url:"/locales/chawkbazar/ar/form.json",revision:"75d51a55d30c27813a3364019fc07dc5"},{url:"/locales/chawkbazar/ar/table.json",revision:"2ce220ec77791db2b2578170ddada4af"},{url:"/locales/chawkbazar/ar/widgets.json",revision:"df1e7237fd580f2da453037c7d515137"},{url:"/locales/chawkbazar/de/banner.json",revision:"c84914bc22078c7a59bfae3e7aaddc79"},{url:"/locales/chawkbazar/de/common.json",revision:"61491bbaed79c35294b370df5b02bb76"},{url:"/locales/chawkbazar/de/form.json",revision:"d028fa2b6bed82446a08cbcb6bb489f9"},{url:"/locales/chawkbazar/de/table.json",revision:"f035889e14c7dc10a1a2d6e3c652e4e1"},{url:"/locales/chawkbazar/de/widgets.json",revision:"b1199bd68bcd268855be08af43505b2e"},{url:"/locales/chawkbazar/en/banner.json",revision:"d5666ca3a09dff6cf3c5b7cbde03b073"},{url:"/locales/chawkbazar/en/common.json",revision:"6b079ff3bbd0a6984d13f32a5ddcfde4"},{url:"/locales/chawkbazar/en/form.json",revision:"15af0d8d7f52bbf9c5ac1f763f4734d0"},{url:"/locales/chawkbazar/en/table.json",revision:"4c3c1f1f4f465fc90f65728e132020be"},{url:"/locales/chawkbazar/en/widgets.json",revision:"c44193c46e2b82cef584ff5d55337db2"},{url:"/locales/chawkbazar/es/banner.json",revision:"2aae7c50599ab479f9705ecc242b4d71"},{url:"/locales/chawkbazar/es/common.json",revision:"6ec2927e12fe95a84b35dbfb25a34976"},{url:"/locales/chawkbazar/es/form.json",revision:"583489917a757b7d2e5b0d5c66bedcb2"},{url:"/locales/chawkbazar/es/table.json",revision:"d4ac96099910eac24c9d92a93445d33a"},{url:"/locales/chawkbazar/es/widgets.json",revision:"5c93a0392b8402bbc6b6df570269455d"},{url:"/locales/chawkbazar/he/banner.json",revision:"2f7beec55a0ba5ff2b18f336d9983fc4"},{url:"/locales/chawkbazar/he/common.json",revision:"fe9c1333447c3fb7931b00ef28b1be9f"},{url:"/locales/chawkbazar/he/form.json",revision:"888d283b62264ea60f10f04614fe8d2a"},{url:"/locales/chawkbazar/he/table.json",revision:"5fcedfabdf85042fbd9b90565abe2294"},{url:"/locales/chawkbazar/he/widgets.json",revision:"c0417ba881a84dfd189c10687226766a"},{url:"/locales/chawkbazar/it/banner.json",revision:"3bc3f925b62f13e4cb886f6eb74b12bb"},{url:"/locales/chawkbazar/it/common.json",revision:"7406bea5c06d9e680f3d6c3057a8c999"},{url:"/locales/chawkbazar/it/form.json",revision:"af521e19b9feedf33e90fafa75440319"},{url:"/locales/chawkbazar/it/table.json",revision:"445914c879659435864a4c17465e660e"},{url:"/locales/chawkbazar/it/widgets.json",revision:"8e42101a03d64bc8bad5129920b72eb2"},{url:"/locales/chawkbazar/zh/banner.json",revision:"3338047cf4570b04a5d5a191d9235e12"},{url:"/locales/chawkbazar/zh/common.json",revision:"6152aa0e1a65da81560edf15651c0375"},{url:"/locales/chawkbazar/zh/form.json",revision:"61ecae167047af5633cec2c5238186c9"},{url:"/locales/chawkbazar/zh/table.json",revision:"39e2d139e8520bf98796bb998b4126ba"},{url:"/locales/chawkbazar/zh/widgets.json",revision:"7389410c637267067a9893546c983ef9"},{url:"/locales/de/banner.json",revision:"c84914bc22078c7a59bfae3e7aaddc79"},{url:"/locales/de/common.json",revision:"61491bbaed79c35294b370df5b02bb76"},{url:"/locales/de/form.json",revision:"b61c93b2b04d52dfc643cccb8dc0bb71"},{url:"/locales/de/table.json",revision:"dd8a0177bbec52bb1dff298f9fb7d541"},{url:"/locales/de/widgets.json",revision:"b1199bd68bcd268855be08af43505b2e"},{url:"/locales/en/banner.json",revision:"d5666ca3a09dff6cf3c5b7cbde03b073"},{url:"/locales/en/common.json",revision:"c5cf73cd8abd0fd25baffa25ae0af263"},{url:"/locales/en/form.json",revision:"9ff69daf5c829b96a227c3951253f6fd"},{url:"/locales/en/table.json",revision:"f4007152de91d62cccd3233b7cd5e936"},{url:"/locales/en/widgets.json",revision:"c44193c46e2b82cef584ff5d55337db2"},{url:"/locales/es/banner.json",revision:"2aae7c50599ab479f9705ecc242b4d71"},{url:"/locales/es/common.json",revision:"6ec2927e12fe95a84b35dbfb25a34976"},{url:"/locales/es/form.json",revision:"82afe1bf8e4292a684612cb11463938f"},{url:"/locales/es/table.json",revision:"84350c8ca2dea112b51a482accfde56e"},{url:"/locales/es/widgets.json",revision:"5c93a0392b8402bbc6b6df570269455d"},{url:"/locales/he/banner.json",revision:"2f7beec55a0ba5ff2b18f336d9983fc4"},{url:"/locales/he/common.json",revision:"fe9c1333447c3fb7931b00ef28b1be9f"},{url:"/locales/he/form.json",revision:"4d2dfa019591598e36ee4d06d2b96855"},{url:"/locales/he/table.json",revision:"f99de3cd3648f8f74e58a091ed4f8f68"},{url:"/locales/he/widgets.json",revision:"c0417ba881a84dfd189c10687226766a"},{url:"/locales/zh/banner.json",revision:"3338047cf4570b04a5d5a191d9235e12"},{url:"/locales/zh/common.json",revision:"6152aa0e1a65da81560edf15651c0375"},{url:"/locales/zh/form.json",revision:"26fb9337f5acabd27e464237ab5ed17e"},{url:"/locales/zh/table.json",revision:"7fa695813eb103971f219311c3a1cde1"},{url:"/locales/zh/widgets.json",revision:"7389410c637267067a9893546c983ef9"},{url:"/logo.svg",revision:"763d6765924f2d26ffb637d97aa48358"},{url:"/manifest.json",revision:"8d7e87a5900e11eb99e87b5e794a9e4c"},{url:"/no-shop.svg",revision:"9813c5d70739486eec6129bfddaad122"},{url:"/product-placeholder-borderless.svg",revision:"497c5bb692fe3f0aa7c58582b42ced0b"},{url:"/product-placeholder.svg",revision:"e0d6a0d9a99a72a2fed058f714cd160d"},{url:"/user-avatar.jpeg",revision:"ab54530285f8d825148761756880f66f"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
