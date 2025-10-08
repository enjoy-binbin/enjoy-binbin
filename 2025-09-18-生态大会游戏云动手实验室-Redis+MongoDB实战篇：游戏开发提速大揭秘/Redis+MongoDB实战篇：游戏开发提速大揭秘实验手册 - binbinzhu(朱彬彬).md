实验手册在线链接：[https://image.qqiyuan.cn/%E5%BC%80%E5%8F%91%E8%80%85%E5%98%89%E5%B9%B4%E5%8D%8E%E2%80%94%E2%80%94%E3%80%8C%E6%B8%B8%E6%88%8F%E4%BA%91%E3%80%8D%E5%8A%A8%E6%89%8B%E5%AE%9E%E9%AA%8C%E5%AE%A4.html#%E4%B8%89%E3%80%81%E3%80%8C%E8%85%BE%E8%AE%AF%E4%BA%91nosql%E3%80%8D%E6%8A%80%E6%9C%AF%E4%B9%8Bredis-mongo%E5%AE%9E%E6%88%98%E7%AF%87%EF%BC%9A%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91%E6%8F%90%E9%80%9F%E5%A4%A7%E6%8F%AD%E7%A7%98](https://image.qqiyuan.cn/%E5%BC%80%E5%8F%91%E8%80%85%E5%98%89%E5%B9%B4%E5%8D%8E%E2%80%94%E2%80%94%E3%80%8C%E6%B8%B8%E6%88%8F%E4%BA%91%E3%80%8D%E5%8A%A8%E6%89%8B%E5%AE%9E%E9%AA%8C%E5%AE%A4.html#%E4%B8%89%E3%80%81%E3%80%8C%E8%85%BE%E8%AE%AF%E4%BA%91nosql%E3%80%8D%E6%8A%80%E6%9C%AF%E4%B9%8Bredis-mongo%E5%AE%9E%E6%88%98%E7%AF%87%EF%BC%9A%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91%E6%8F%90%E9%80%9F%E5%A4%A7%E6%8F%AD%E7%A7%98)



# **<font style="color:#1a1a1a;">1 前言</font>**
## **<font style="color:#1a1a1a;">1.1 实验内容和实验效果</font>**
<font style="color:#333333;">使用</font>**<font style="color:#333333;">腾讯云产品</font>**<font style="color:#333333;">快速</font><font style="color:#333333;">开发</font>**<font style="color:#333333;">游戏排行榜</font>**<font style="color:#333333;">与</font>**<font style="color:#333333;">游戏装备背包</font>**<font style="color:#333333;">功能</font><font style="color:#333333;">。</font>



<font style="color:#333333;">极速竞技场排行榜，通过 Redis 里的 zset 数据结构快速构建高性能的游戏排行榜。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757323844729-3c09ae18-c6b5-4bd1-91c3-9a2df3d79cdd.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_82%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



<font style="color:#333333;">装备背包系统，通过 MongoDB 文档数据库来方便的存储各种装备信息。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757301455775-2783bb20-ac81-40d4-91dc-8ad1e0ede7f5.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_72%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



## **<font style="color:#1a1a1a;">1.2 实验中所使用的产品及技术</font>**
**<font style="color:#333333;">1</font>****<font style="color:#333333;">）</font>****<font style="color:#333333;">涉及的产品：</font>**

<font style="color:#333333;">云开发平台（云函数和静态网站托管）、腾讯云</font><font style="color:#2e3033;"> Redis</font><font style="color:#2e3033;">®</font><font style="color:#333333;"> 数据库和腾讯云 MongoDB 数据库。</font>

<font style="color:#333333;"></font>

<font style="color:#333333;">云开发（Tencent CloudBase，TCB）是腾讯云提供的云原生一体化开发环境和工具平台，为开发者提供高可用、自动弹性扩缩的后端云服务，包含计算、存储、托管等 Serverless 化能力，可用于云端一体化开发多种端应用（小程序、公众号、Web 应用等），帮助开发者统一构建和管理后端服务和云资源，避免了应用开发过程中繁琐的服务器搭建及运维，开发者可以专注于业务逻辑的实现，开发门槛更低，效率更高。</font>

[云开发 CloudBase 产品概述_腾讯云](https://cloud.tencent.com/document/product/876/18431)



腾讯云云函数（Serverless Cloud Function，SCF）是腾讯云为企业和开发者们提供的无服务器执行环境，帮助您在无需购买和管理服务器的情况下运行代码， 是实时文件处理和数据处理等场景下理想的计算平台。您只需使用 SCF 平台支持的语言编写核心代码并设置代码运行的条件，即可在腾讯云基础设施上弹性、安全地运行代码

[云函数 产品概述_腾讯云](https://cloud.tencent.com/document/product/583/9199)



<font style="color:#333333;">CloudBase 静态网站托管可以为您的 Web 应用、静态资源提供快速、安全的托管服务。只需要一个命令，并可以快速地部署静态资源，并且使用 CDN（内容分发网络）加快资源的访问速度。</font>

[云开发 CloudBase 概述_腾讯云](https://cloud.tencent.com/document/product/876/40270)



云数据库 Redis®（TencentDB for Redis®）是由腾讯云提供的兼容 Redis 协议与 Memcached 协议的缓存数据库，具备高可用、高可靠、高弹性等特征。云数据库 Redis® 服务兼容 Redis 2.8、Redis 4.0、Redis 5.0、Redis 6.2、Redis 7.0 版本协议，兼容 Memcached 1.6 版本，提供标准和集群两大架构版本。最大支持 16TB 的存储容量，千万级的并发请求，可满足业务在缓存、存储、计算等不同场景中的需求。

[云数据库 Redis® 产品概述_腾讯云](https://cloud.tencent.com/document/product/239/3205)



云数据库 MongoDB（TencentDB for MongoDB）是腾讯云基于开源非关系型数据库 MongoDB 专业打造的高性能、分布式文件存储数据库，完全兼容 MongoDB 协议，提供多节点高可用架构、备份恢复、弹性扩容、容灾、全托管运维、性能调优等功能。

[云数据库 MongoDB 产品概述_腾讯云](https://cloud.tencent.com/document/product/240/3544)



使用腾讯云相关产品的时候，往往会涉及到其它概念：

+ [私有网络](https://cloud.tencent.com/document/product/215/20046)：私有网络（Virtual Private Cloud，VPC）是一块在腾讯云上自定义的逻辑隔离的网络空间，可以为云服务器、云数据库等资源构建逻辑隔离的、用户自定义配置的网络空间，以提升用户云上资源的安全性，并满足不同的应用场景需求。
+ [安全组](https://cloud.tencent.com/document/product/239/30911)：是一种有状态的包含过滤功能的虚拟防火墙，用于设置单个或多个云数据库的网络访问控制，是腾讯云提供的重要的网络安全隔离手段。
+ [地域和可用区](https://cloud.tencent.com/document/product/239/4106)：地域（Region）是指物理的数据中心的地理区域。
+ 腾讯云控制台：基于 Web 的用户界面。



**<font style="color:#333333;">2）涉及的技术特性：</font>**

+ **<font style="color:#333333;">游戏排行榜</font>**<font style="color:#333333;">：腾讯云</font><font style="color:#2e3033;"> Redis</font><font style="color:#2e3033;">®</font><font style="color:#2e3033;"> </font><font style="color:#333333;">100% 兼容 Redis 协议且具备超高性能和丰富的数据结构，其中内置的丰富命令直接覆盖了排行榜的各种业务场景，极大地简化了开发流程，通过使用 </font>**<font style="color:#333333;">Redis 有序集合(Sorted Set)</font>**<font style="color:#333333;">存储玩家名称与得分。Redis 有序集合是一个既保持元素</font>**<font style="color:#333333;">唯一性</font>**<font style="color:#333333;">，又能</font>**<font style="color:#333333;">按分数排序</font>**<font style="color:#333333;">的数据结构。结合了哈希表和跳跃表，提供 </font>**<font style="color:#333333;">O(log N) 的插入和查询性能</font>**<font style="color:#333333;">。有序集合非常适合游戏排行榜的开发场景，是高性能排行榜系统几乎无可替代的最佳选择。</font>
+ **<font style="color:#333333;">游戏装备背包</font>**<font style="color:#333333;">：使用 </font>**<font style="color:#333333;">MongoDB 文档数据库</font>**<font style="color:#333333;">存储装备信息。MongoDB 的文档模型完美契合游戏装备系统的需求：其 </font>**<font style="color:#333333;">Schema-less 特性</font>**<font style="color:#333333;">允许不同类型装备（武器、护甲、饰品）拥有各自独特的属性结构，支持随时增加新的装备属性系统，无需预定义表结构；支持</font>**<font style="color:#333333;">嵌套文档存储复杂属性</font>**<font style="color:#333333;">（如多重抗性、附魔列表），单次查询即可获取完整装备信息；通过索引优化支持高效的装备查询和检索。当玩家数据不断增长时，原生分片功能可以支持无缝扩容，这种设计既满足了游戏装备系统的复杂性和扩展性需求，又保证了良好的性能表现，也支持了规模上的不断增长。</font>



## 1.3 数据库存储数据展示
### Redis 云数据库
<font style="color:#333333;">DMS 数据展示：</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757323905369-aebbacb6-5929-410d-8ec1-eede5a886952.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_80%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



<font style="color:#333333;">命令行数据展示：</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757323974222-f51adda2-d735-4f83-993e-d91c73b0cdfa.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_34%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



### MongoDB 云数据库
<font style="color:#333333;">命令行数据展示：</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757476830235-698aa673-30ec-4fbf-94f2-611dd40ee35e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_62%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

<font style="color:#333333;"></font>

<font style="color:#333333;">每条文档格式如下：</font>

```json
{
	"_id" : ObjectId("68c0112912a8b863a48bcb0d"),
	"name" : "炎魔之剑",
	"type" : "weapon",
	"rarity" : "legendary",
	"level" : 100,
	"color" : "#ff8c00",
	"quality" : 4,
	"stats" : {
		"attack" : 55,
		"crit_rate" : 0.16061912485115185,
		"attack_speed" : 0.9713034859213873
	},
	"created_at" : ISODate("2025-09-09T11:36:09.195Z"),
	"enchantments" : [ ],
	"special_effect" : {
		"name" : "烈焰之怒",
		"description" : "攻击时有20%概率造成额外火焰伤害",
		"proc_chance" : 0.2,
		"damage_type" : "fire",
		"damage_range" : [
			50,
			150
		]
	}
}
```



# **<font style="color:#1a1a1a;">2 准备工作</font>**
## <font style="color:#1a1a1a;">2.1 申请云开发 CloudBase 环境</font>
<font style="color:#333333;">在 </font>[云开发 CloudBase_TCB_移动应用开发_后端云服务-腾讯云](https://cloud.tencent.com/product/tcb) <font style="color:#333333;">中申请云开发环境。</font>

<font style="color:#333333;"></font>

<font style="color:#333333;">由于需要对接自有腾讯云数据库，请选择</font>**<font style="color:#333333;">标准版</font>**<font style="color:#333333;">。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757389770796-46393468-16d8-4eaa-b40c-d25d311167eb.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_88%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

<font style="color:#333333;"></font>

<font style="color:#333333;">其它配置项按需设置。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757301455721-04ec50c6-c198-477f-ac5e-d6abe0fe23bc.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_76%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

<font style="color:#333333;"></font>

## <font style="color:#1a1a1a;">2.2 申请云数据库 Redis</font><font style="color:#1a1a1a;">®</font><font style="color:#1a1a1a;"> 实例</font>
<font style="color:#333333;">在</font>[云数据库 Redis®_数据库缓存_数据库存储-腾讯云](https://cloud.tencent.com/product/crs)<font style="color:#333333;">中申请 Redis 实例。</font>

<font style="color:#333333;">注意</font>**<font style="color:#333333;">实例地域选择上海</font>**<font style="color:#333333;">，并配置私有网络。选择上海是因为：为了安全性，连接云 Redis 最好通过私有网络，因此云 Redis 地域和云开发需要在同一个地域，</font>**<font style="color:#333333;">而目前云开发地域只能选上海</font>**<font style="color:#333333;">，所以这次演示选择上海地域。</font>

<font style="color:#333333;"></font>

<font style="color:#333333;">计费模式选择按量计费，地域选择上海。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757386935041-19662d96-5b25-496b-87f7-3877e3c4606a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_62%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

<font style="color:#333333;"></font>

<font style="color:#333333;">产品版本选择 Redis 版，后面的选项按需设置。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757386980056-6de1c492-a53d-4bf8-8f80-787122d4e034.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_50%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



网络类型选择私有网络。若没有上海地域的私有网络，可通过按钮去新键私有网络和子网进行实验。

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757388552452-422dcdce-618b-4d5e-8aff-856cb0d67a8b.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_53%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757388475665-61102fa0-8af5-4e16-ba2c-0bb99d728b05.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_67%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



参数模版可选择默认参数模版。为实验方便这边安全组可选择默认安全组，如需生产环境使用，建议自定义配置以获得更好的安全性。

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757388852542-42ceec02-1ae6-4df2-807f-4c1e68eb4e68.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_40%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



最后设置实例名称以及连接密码。

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757388975272-f09a1ae3-1f4e-4278-b6e6-dcaf06babc75.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_49%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



## <font style="color:#1a1a1a;">2.3 申请云数据库 MongoDB 实例</font>
<font style="color:#333333;">在</font>[云数据库MongoDB_NoSQL数据库_文档型数据库-腾讯云](https://cloud.tencent.com/product/mongodb)<font style="color:#333333;">中申请 MongoDB 实例。</font>

<font style="color:#333333;">注意</font>**<font style="color:#333333;">实例地域选择上海</font>**<font style="color:#333333;">，并配置私有网络。选择上海是因为：为了安全性，连接云 MongoDB 最好通过私有网络，因此云 MongoDB 地域和云开发需要在同一个地域，</font>**<font style="color:#333333;">而目前云开发地域只能选上海</font>**<font style="color:#333333;">，所以这次演示选择上海地域。</font>



计费模式选择按量计费，地域选择上海。

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757389189546-9c16955b-b31b-4101-bb37-6664b6a28cf3.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_69%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



相关选项按需设置，实验可都选择默认配置。

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757389233612-c282afc9-a09a-4d99-8913-136892d6c780.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_79%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



相关选项按需设置。

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757389310312-396461e1-2eff-4c4f-a44a-b7b8d42fe83f.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_58%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



网络类型选择私有网络。若没有上海地域的私有网络，可通过按钮去新键私有网络和子网进行实验。为实验方便这边安全组可选择默认安全组，如需生产环境使用，建议自定义配置以获得更好的安全性。

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757389355857-67e12e31-1920-46ac-8e92-95f7396fb2c7.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_59%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



最后设置实例名称以及连接密码。

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757389432633-be9b2919-114f-4024-aae7-b538356c452a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_45%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



# **<font style="color:#1a1a1a;">3 排行榜 Redis 实验过程</font>**
## **<font style="color:#1a1a1a;">3.1 在云函数中配置 API</font>**
<font style="color:#1c1e21;">进入 </font>[腾讯云 CloudBase](https://tcb.cloud.tencent.com/dev?#/scf) <font style="color:#1c1e21;">云函数界面，点击「</font>**<font style="color:#1c1e21;">新建云函数</font>**<font style="color:#1c1e21;">」按钮</font>

<font style="color:#1c1e21;"></font>

1. <font style="color:#333333;">选择 Nodejs 空白模板。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757301458116-e6cf5d6b-0298-4390-b056-7ffac16d2b73.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_98%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



2. <font style="color:#333333;">在模板中编写后端代码。云函数会自动根据 package.json 在环境中安装依赖。</font>**<font style="color:#333333;">完整代码见附录的 index.js 和 package.json 文件，可直接复制到对应模版中。</font>**<font style="color:#333333;">在云函数中可以连接到云 Redis 实例，代码中将通过环境变量获取 Redis 连接配置信息，这个内容将在后面进行配置。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757390402272-09acfd4b-76eb-4c43-9d0f-e354152dd562.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_51%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



3. <font style="color:#333333;">填写函数名称 game-leaderboard，点击</font>**<font style="color:#333333;">「创建」</font>**<font style="color:#333333;">按钮。</font>

**<font style="color:#333333;"></font>**

4. <font style="color:#333333;">创建成功后，进入</font>**<font style="color:#333333;">云函数——函数配置界面</font>**

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757390613129-5e36323b-31f5-4b29-b1e0-ec112498cd6e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_59%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



<font style="color:#333333;">配置 Redis 连接相关的环境变量。连接的内网 IP 地址和端口可从 Redis 实例详情页查看，连接密码则是之前创建 Redis 实例时设置的。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757390870390-1254d00d-ad86-43cd-9549-aa956b966349.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_63%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757390997258-65ad359f-68f5-4212-bc39-f2594e8ad33a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_38%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

```json
{"REDIS_HOST":"xxx","REDIS_PORT":"xxx","REDIS_PASSWORD":"xxx","REDIS_DB":"0"}
```



配置私有网络访问，以便能够连接 Redis 实例所在的 VPC 私有网络。

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757391099495-22f09b36-50e5-4165-af6d-2e78b4e540e9.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_63%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



<font style="color:#333333;">点击</font>**<font style="color:#333333;">「保存」。</font>**



## 3.2 配置 HTTP 访问服务
<font style="color:#333333;">在云开发环境配置中，创建 HTTP 服务用于访问排行榜云函数。</font><font style="color:#1c1e21;">进入 </font>[腾讯云 CloudBase](https://tcb.cloud.tencent.com/dev?#/env/http-access)<font style="color:#1c1e21;">，新建一个「域名关联资源」</font>

+ <font style="color:#1c1e21;">关联资源，选择刚刚创建的云函数。</font>
+ <font style="color:#1c1e21;">域名选择默认域名，之后可通过该域名访问服务。</font>
+ <font style="color:#1c1e21;">填写触发路径。</font>
+ <font style="color:#1c1e21;">关闭身份验证（</font><font style="color:#333333;">为演示方便将身份认证暂时关闭</font><font style="color:#1c1e21;">）。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757402747757-e5dda722-5cb8-4ada-b903-0c220f17edc9.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_34%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

<font style="color:#1c1e21;"></font>

<font style="color:#1c1e21;">等待创建完成，之后</font><font style="color:#333333;">可以通过 </font>**<font style="color:#333333;">默认域名/leaderboard</font>**<font style="color:#333333;"> 调用云函数。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757402807795-4986efdd-96ee-4297-848b-e0e7a8b9c9d6.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_86%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

<font style="color:#333333;"></font>

## **<font style="color:#1a1a1a;">3.3 通过静态网站托管部署前端</font>**
<font style="color:#333333;">在本地创建文件夹 leaderboard，在里面存放着排行榜的前端代码，总共3个文件 index.html, style.css, script.js。编辑 script.js 文件，将里面的里面的 API_URL 替换为自己云函数的 API URL。</font>

```javascript
// API 配置
const API_URL = 'https://shengtaidahui-shanghai-927ed19f8-1310738255.ap-shanghai.app.tcloudbase.com/leaderboard';
```



<font style="color:#333333;">进入静态网站托管页面</font>[云开发-静态网站托管](https://console.cloud.tencent.com/tcb/hosting)<font style="color:#333333;">，上传前端资源对应文件夹。也可以新键文件夹后在对应文件夹里单独上传前端静态资源。（</font>**<font style="color:#333333;">注: 第一次使用静态过程需要开通，过程越需要 3 分钟</font>**<font style="color:#333333;">）</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757396457055-c5238c78-95fc-4695-a678-5748dd9a9be3.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_62%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



待静态资源上传部署完成后，可以通过<font style="color:#333333;">可在浏览器中通过 "默认域名/leaderboard" 的方式访问游戏排行榜界面，例如访问</font>

[https://shengtaidahui-shanghai-927ed19f8-1310738255.tcloudbaseapp.com/leaderboard/](https://shengtaidahui-shanghai-927ed19f8-1310738255.tcloudbaseapp.com/leaderboard/)



## 3.4 实验效果及 Redis 命令调用
数据结构：zset

键名：leaderboard

分数：score 即为用户分数

成员：member 即为用户名



添加玩家接口：通过 ZADD 命令往对应键里增加成员及其分数，例如 ZADD leaderboard score username

删除用户接口：通过 ZREM 命令将对应成员从键中移除，例如 ZREM leaderboard username

查询玩家分数接口：通过 ZSCORE 命令查询对应成员的分数，例如 ZSCORE leaderboard username

查询玩家排名和分数接口：通过 ZREVRANK 命令倒序查询对应成员的排名及其分数，例如 ZREVRANK leaderboard username [WITHSCORE]

玩家总数接口：通过 ZCARD 命令查询对应键里的元素数量，例如 ZCARD leaderboard

排行榜 TOP N 接口：通过 ZREVRANGE 命令查询键中指定范围里的元素（按照分数从高到低顺序排序），例如 ZREVRANGE leaderboard start stop [WITHSCORES]

清空排行榜接口：通过 DEL 或者 UNLINK 命令删除对应键，例如 DEL leaderboard 或者 UNLINK leaderboard



相关接口调用使用到的 Redis 命令：

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757404693033-b38694c0-dfc2-4d40-804d-a0fd415553c4.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_90%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



# 4 装备背包 MongoDB 实验过程
## **<font style="color:#1a1a1a;">4.1 在云函数中配置 API</font>**
<font style="color:#1c1e21;">进入 </font>[腾讯云 CloudBase](https://tcb.cloud.tencent.com/dev?#/scf) <font style="color:#1c1e21;">云函数界面，点击「</font>**<font style="color:#1c1e21;">新建云函数</font>**<font style="color:#1c1e21;">」按钮</font>

<font style="color:#1c1e21;"></font>

1. <font style="color:#333333;">选择 Nodejs 空白模板。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757301458116-e6cf5d6b-0298-4390-b056-7ffac16d2b73.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_98%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



2. <font style="color:#333333;">在模板中编写后端代码。云函数会自动根据 package.json 在环境中安装依赖。</font>**<font style="color:#333333;">完整代码见附录的 index.js 和 package.json 文件，可直接复制到对应模版中。</font>**<font style="color:#333333;">在云函数中可以连接到云 MongoDB 实例，代码中将通过环境变量获取 MongoDB 连接配置信息，这个内容将在后面进行配置。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757405408649-7b90a93f-a6c8-4ae1-bc9b-1607aee0ce47.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_53%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



3. <font style="color:#333333;">填写函数名称 game-backpack，点击</font>**<font style="color:#333333;">「创建」</font>**<font style="color:#333333;">按钮。</font>

**<font style="color:#333333;"></font>**

4. <font style="color:#333333;">创建成功后，进入</font>**<font style="color:#333333;">云函数——函数配置界面</font>**

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757405512177-2a59af77-81aa-45e4-abe1-55fab158d8c4.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_59%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



<font style="color:#333333;">配置 MongoDB 连接相关的环境变量。连接地址可从 MongoDB 实例详情页查看，连接密码则是之前创建 MongoDB 实例时设置的。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757405816195-bac54443-db43-4d0b-911c-c19edc113d1e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_58%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757405913128-513e2168-0b09-457d-91c0-d3b3aa2dc7d5.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_43%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

```json
{"MONGODB_URI":"xxx"}
```



配置私有网络访问，以便能够连接 MongoDB 实例所在的 VPC 私有网络。

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757405951138-8d6782e3-7f78-4bc7-9d11-f0efbbae21cd.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_64%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



<font style="color:#333333;">点击</font>**<font style="color:#333333;">「保存」。</font>**



## 4.2 配置 HTTP 访问服务
<font style="color:#333333;">在云开发环境配置中，创建 HTTP 服务用于访问排行榜云函数。</font><font style="color:#1c1e21;">进入 </font>[腾讯云 CloudBase](https://tcb.cloud.tencent.com/dev?#/env/http-access)<font style="color:#1c1e21;">，新建一个「域名关联资源」</font>

+ <font style="color:#1c1e21;">关联资源，选择刚刚创建的云函数。</font>
+ <font style="color:#1c1e21;">域名选择默认域名，之后可通过该域名访问服务。</font>
+ <font style="color:#1c1e21;">填写触发路径。</font>
+ <font style="color:#1c1e21;">关闭身份验证（</font><font style="color:#333333;">为演示方便将身份认证暂时关闭</font><font style="color:#1c1e21;">）。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757406046280-38fc2e12-1e1d-40fa-b99d-a6b3f50c296c.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_34%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

<font style="color:#1c1e21;"></font>

<font style="color:#1c1e21;">等待创建完成，之后</font><font style="color:#333333;">可以通过 </font>**<font style="color:#333333;">默认域名/leaderboard</font>**<font style="color:#333333;"> 调用云函数。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757406145058-5709426f-2869-4a80-a1f9-6c9c462cb553.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_86%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

<font style="color:#333333;"></font>

## **<font style="color:#1a1a1a;">4.3 通过静态网站托管部署前端</font>**
<font style="color:#333333;">在本地创建文件夹 backpack，在里面存放装备背包的前端代码，总共3个文件 index.html, style.css, script.js。编辑 script.js 文件，将里面的里面的 API_URL 替换为自己云函数的 API URL。</font>

```javascript
// API 配置
const API_URL = 'https://shengtaidahui-shanghai-927ed19f8-1310738255.ap-shanghai.app.tcloudbase.com/backpack';
```



<font style="color:#333333;">进入静态网站托管页面</font>[云开发-静态网站托管](https://console.cloud.tencent.com/tcb/hosting)<font style="color:#333333;">，上传前端资源对应文件夹。也可以新键文件夹后在对应文件夹里单独上传前端静态资源。（</font>**<font style="color:#333333;">注: 第一次使用静态过程需要开通，过程越需要 3 分钟</font>**<font style="color:#333333;">）</font>

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757406379481-931c2f15-714a-4841-a9fe-d07ae724bae1.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_86%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



待静态资源上传部署完成后，可以通过<font style="color:#333333;">可在浏览器中通过 "默认域名/backpack" 的方式访问游戏排行榜界面，例如访问</font>

[https://shengtaidahui-shanghai-927ed19f8-1310738255.tcloudbaseapp.com/backpack/](https://shengtaidahui-shanghai-927ed19f8-1310738255.tcloudbaseapp.com/backpack/)



## 4.4 实验效果及 MongoDB 命令调用
初始化数据接口，通过 insertMany 可以插入多条文档：

```plain
db.items.insertMany([
    { name : "炎魔之剑", type : "weapon", rarity : "legendary", level : "99"},
    { name : "寒冰护甲", type : "armor", rarity : "epic" , level : "55" }
])
```



添加装备接口，通过 insertOne 可以插入一条文档：

```plain
db.items.insertOne(
    { name : "炎魔之剑", type : "weapon", rarity : "legendary", level : "100"}
)
```



查询所有装备接口，通过 find({}) 方法，省略 query 参数或者传入空文档 {}：

```plain
db.items.find({})
```



查询单个装备接口，通过 findOne 方法，传入文档的 _id：

```plain
db.items.findOne({ _id: ObjectId("68bff086a1d75225707f9ecd")})
```



更新追加单个装备附魔接口，通过 updateOne 方法，传入文档的 _id：

```plain
db.items.updateOne(
    { _id: ObjectId("68bff086a1d75225707f9ece")},
    { $push: { enchantments: { "name" : "力量", "value" : 100, } }}
)
```



删除单个装备接口，通过 deleteOne 方法，传入文档的 _id：

```plain
db.items.deleteOne({ _id: ObjectId("68bff086a1d75225707f9ecd")})
```



删除所有装备接口，通过 deleteMany 方法，省略 query 参数或者传入空文档 {}：

```plain
db.items.deleteMany({})
```



文档型数据库 DMS 数据展示：

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757593841836-24847b19-6c9b-4cc3-a908-dce9deb7b636.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_56%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



相关接口调用使用到的 MongoDB 命令：

![](https://cdn.nlark.com/yuque/0/2025/png/258841/1757418337123-4908dd74-7c9e-4ca5-a89c-f8713c699c59.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_87%2Ctext_QmluYmlu%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)



# **<font style="color:#1a1a1a;">附录1 排行榜代码</font>**
## **<font style="color:#1a1a1a;">index.js 云函数代码</font>**
```javascript
// index.js - 使用 ioredis 作为客户端包
const Redis = require('ioredis');
 
// 创建 Redis 客户端
let redisClient = null;
 
// 初始化 Redis 连接
async function initRedis() {
    if (redisClient && redisClient.status === 'ready') {
        return redisClient;
    }
 
    // ioredis 的连接配置
    redisClient = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD || undefined,
        db: parseInt(process.env.REDIS_DB) || 0,
        retryStrategy: (times) => {
            const delay = Math.min(times * 50, 2000);
            return delay;
        },
        lazyConnect: false,
        enableReadyCheck: true,
        maxRetriesPerRequest: 3
    });

    return redisClient;
}
 
// 解析请求参数的辅助函数
function parseRequestParams(event) {
    let params = {};
 
    // 处理 GET 请求参数
    if (event.queryStringParameters) {
        params = { ...event.queryStringParameters };
    }
 
    // 处理 POST 请求body
    if (event.body) {
        let bodyData = {};
 
        // 如果 body 是字符串，尝试解析
        if (typeof event.body === 'string') {
            try {
                bodyData = JSON.parse(event.body);
            } catch (e) {
                console.log('Body不是有效的JSON，尝试作为普通字符串处理');
            }
        }
        // 如果 body 已经是对象
        else if (typeof event.body === 'object') {
            bodyData = event.body;
        }
 
        // 合并body数据到params
        params = { ...params, ...bodyData };
    }
 
    // 如果还是没有获取到参数，尝试直接使用 event
    // 兼容某些云函数直接将参数放在 event 根级别的情况
    if (!params.action) {
        // 检查 event 根级别是否有 action
        if (event.action) {
            params = { ...params, ...event };
        }
        // 检查是否有 isBase64Encoded（表示这是一个HTTP事件）
        else if (event.isBase64Encoded !== undefined && event.body) {
            console.log('检测到HTTP事件格式，但未能正确解析参数');
        }
    }
 
    console.log('解析后的参数:', JSON.stringify(params, null, 2));
    return params;
}
 
// 主函数
exports.main = async (event, context) => {
    try {
        // 初始化 Redis 连接
        const client = await initRedis();
 
        // 从 event 中获取参数
        const params = parseRequestParams(event);
        const { action } = params;
 
        // 根据action执行不同的操作
        switch (action) {
            // 提交分数
            case 'submit_score':
                return await submitScore(client, params);
 
            // 获取排行榜
            case 'get_leaderboard':
                return await getLeaderboard(client, params);
 
            // 获取特定用户的排名和分数
            case 'get_user':
                return await getUserRank(client, params);
 
            // 删除用户
            case 'delete_user':
                return await deleteUser(client, params);
 
            // 查询用户信息
            case 'query_user':
                return await queryUser(client, params);
 
            // 清空排行榜
            case 'clear_leaderboard':
                return await clearLeaderboard(client);
 
            // 批量导入数据
            case 'batch_import':
                return await batchImport(client, params);
 
            default:
                return {
                    statusCode: 200,
                    headers: getCORSHeaders(),
                    body: JSON.stringify({
                        message: "游戏排行榜API",
                        availableActions: [
                            "submit_score - 提交分数",
                            "get_leaderboard - 获取排行榜",
                            "get_user - 获取用户排名",
                            "query_user - 查询用户信息",
                            "clear_leaderboard - 清空排行榜",
                            "batch_import - 批量导入数据"
                        ]
                    })
                };
        }
    } catch (error) {
        console.error("Main Error:", error);
        return {
            statusCode: 500,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "error",
                message: error.message,
                stack: process.env.NODE_ENV === "development" ? error.stack : undefined
            })
        };
    }
};
 
// CORS headers
function getCORSHeaders() {
    return {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
        "Access-Control-Allow-Headers": "Content-Type"
    };
}
 
// 提交分数
async function submitScore(client, params) {
    const { username, score } = params;
 
    if (!username || score === undefined) {
        return {
            statusCode: 400,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "error",
                message: "缺少必要参数：username 或 score"
            })
        };
    }
 
    const scoreNum = parseInt(score);
    if (isNaN(scoreNum)) {
        return {
            statusCode: 400,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "error",
                message: "score 必须是有效的数字"
            })
        };
    }
 
    try {
        // ioredis 的 zadd 使用方式：zadd(key, score, member)
        await client.zadd("leaderboard", scoreNum, username);
 
        // 获取用户排名（从高到低），这里更严谨点需要和 zadd 保证原子性
        const rank = await client.zrevrank("leaderboard", username);
 
        return {
            statusCode: 200,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "success",
                message: "分数提交成功",
                data: {
                    username: username,
                    score: scoreNum,
                    rank: rank !== null ? rank + 1 : null
                }
            })
        };
    } catch (err) {
        console.error("Submit Score Error:", err);
        throw err;
    }
}
 
// 获取排行榜
async function getLeaderboard(client, params) {
    const limit = parseInt(params.limit) || 30;
 
    try {
        // 获取总人数
        const totalUsers = await client.zcard("leaderboard");
 
        // 获取排行榜数据（分数从高到低），这里更严谨点需要保证原子性
        // ioredis 的 zrevrange 返回格式：[member1, score1, member2, score2, ...]
        const leaderboardData = await client.zrevrange("leaderboard", 0, limit - 1, "WITHSCORES");
 
        // 解析数据
        const leaderboard = [];
        for (let i = 0; i < leaderboardData.length; i += 2) {
            leaderboard.push({
                rank: Math.floor(i / 2) + 1,
                username: leaderboardData[i],
                score: parseInt(leaderboardData[i + 1])
            });
        }
 
        return {
            statusCode: 200,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                total_users: totalUsers,
                leaderboard: leaderboard
            })
        };
    } catch (err) {
        console.error("Get Leaderboard Error:", err);
        throw err;
    }
}
 
// 获取特定用户的排名和分数
async function getUserRank(client, params) {
    const { username } = params;
 
    if (!username) {
        return {
            statusCode: 400,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "error",
                message: "缺少参数：username"
            })
        };
    }
 
    try {
        // ioredis 的 zscore 返回字符串或 null
        const score = await client.zscore("leaderboard", username);
 
        if (score === null) {
            return {
                statusCode: 404,
                headers: getCORSHeaders(),
                body: JSON.stringify({
                    status: "error",
                    message: "用户不存在"
                })
            };
        }
 
        const rank = await client.zrevrank("leaderboard", username);
        const totalUsers = await client.zcard("leaderboard");
 
        return {
            statusCode: 200,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                username: username,
                score: parseInt(score),
                rank: rank !== null ? rank + 1 : null,
                total_users: totalUsers
            })
        };
    } catch (err) {
        console.error("Get User Rank Error:", err);
        throw err;
    }
}
 
// 查询用户信息
async function queryUser(client, params) {
    const { username } = params;
 
    if (!username) {
        return {
            statusCode: 400,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "error",
                message: "缺少参数：username"
            })
        };
    }
 
    try {
        const score = await client.zscore("leaderboard", username);
 
        if (score === null) {
            return {
                statusCode: 200,
                headers: getCORSHeaders(),
                body: JSON.stringify({
                    status: "not_found",
                    message: `用户 '${username}' 不存在`
                })
            };
        }
 
        const rank = await client.zrevrank("leaderboard", username);
        const totalUsers = await client.zcard("leaderboard");
 
        return {
            statusCode: 200,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "found",
                data: {
                    username: username,
                    score: parseInt(score),
                    rank: rank !== null ? rank + 1 : null,
                    total_users: totalUsers
                }
            })
        };
    } catch (err) {
        console.error("Query User Error:", err);
        throw err;
    }
}
 
// 清空排行榜
async function clearLeaderboard(client) {
    try {
        // Redis4.0 开始有提供 unlink 命令，如果键会有可能是一个大键，推荐使用 unlink
        // 来删除键以避免阻塞 Redis 服务
        await client.del("leaderboard");
 
        return {
            statusCode: 200,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "success",
                message: "排行榜已清空"
            })
        };
    } catch (err) {
        console.error("Clear Leaderboard Error:", err);
        throw err;
    }
}
 
// 批量导入数据
async function batchImport(client, params) {
    const { scores } = params;
 
    if (!scores || !Array.isArray(scores)) {
        return {
            statusCode: 400,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "error",
                message: "scores 必须是一个数组"
            })
        };
    }
 
    try {
        // 使用 ioredi s的 pipeline 批量导入
        const pipeline = client.pipeline();
 
        for (const item of scores) {
            if (item.username && typeof item.score === "number") {
                pipeline.zadd("leaderboard", item.score, item.username);
            }
        }
 
        // 执行pipeline
        await pipeline.exec();
 
        return {
            statusCode: 200,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "success",
                message: `成功导入 ${scores.length} 条数据`
            })
        };
    } catch (err) {
        console.error("Batch Import Error:", err);
        throw err;
    }
}
 
// 删除用户
async function deleteUser(client, params) {
    const { username } = params;
 
    if (!username) {
        return {
            statusCode: 400,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                status: "error",
                message: "缺少参数：username"
            })
        };
    }
 
    try {
        // 检查用户是否存在
        const score = await client.zscore("leaderboard", username);
 
        if (score === null) {
            return {
                statusCode: 404,
                headers: getCORSHeaders(),
                body: JSON.stringify({
                    status: "error",
                    message: `用户 '${username}' 不存在`
                })
            };
        }
 
        // 从有序集合中删除成员
        const removed = await client.zrem("leaderboard", username);
 
        if (removed > 0) {
            return {
                statusCode: 200,
                headers: getCORSHeaders(),
                body: JSON.stringify({
                    status: "success",
                    message: `成功删除用户 '${username}'`,
                    data: {
                        username: username,
                        removed_count: removed
                    }
                })
            };
        } else {
            return {
                statusCode: 500,
                headers: getCORSHeaders(),
                body: JSON.stringify({
                    status: "error",
                    message: "删除失败"
                })
            };
        }
    } catch (err) {
        console.error("Delete User Error:", err);
        throw err;
    }
}
 
process.on("SIGTERM", async () => {
    if (redisClient) {
        await redisClient.quit();
    }
});


```

<font style="color:#333333;"></font>

## **<font style="color:#1a1a1a;">package.json 云函数依赖</font>**
```json
{
  "name": "game-leaderboard",
  "version": "1.0.0",
  "description": "游戏排行榜云函数",
  "main": "index.js",
  "dependencies": {
    "ioredis": "^5.3.2"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

<font style="color:#333333;"></font>

## **<font style="color:#1a1a1a;">index.html 前端 HTML</font>**
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>极速竞技场 - 全球排行榜</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
</head>
<body>
    <!-- 背景动画 -->
    <div class="background">
        <div class="stars"></div>
        <div class="stars2"></div>
        <div class="stars3"></div>
    </div>
 
    <!-- 主容器 -->
    <div class="container">
        <!-- 标题区域 -->
        <header class="header">
            <h1 class="title">
                <span class="title-main">极速竞技场</span>
                <span class="title-sub">GLOBAL LEADERBOARD</span>
            </h1>
            <div class="stats-bar">
                <div class="stat-item">
                    <span class="stat-label">玩家总数</span>
                    <span class="stat-value" id="totalPlayers">0</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">实时更新</span>
                    <span class="stat-value pulse" id="updateStatus">●</span>
                </div>
            </div>
        </header>
 
        <!-- 控制面板 -->
        <div class="control-panel">
            <!-- 查询区域 -->
            <div class="control-section">
                <h3 class="section-title">查询玩家</h3>
                <div class="input-group">
                    <input type="text" id="searchInput" placeholder="输入玩家名称..." class="neon-input">
                    <button onclick="searchPlayer()" class="btn btn-search">
                        <span class="btn-icon">🔍</span>
                        查询
                    </button>
                </div>
                <div id="searchResult" class="search-result"></div>
            </div>
 
            <!-- 添加玩家区域 -->
            <div class="control-section">
                <h3 class="section-title">添加玩家</h3>
                <div class="input-group">
                    <input type="text" id="newPlayerName" placeholder="玩家名称" class="neon-input">
                    <input type="number" id="newPlayerScore" placeholder="分数" class="neon-input" min="0">
                    <button onclick="addPlayer()" class="btn btn-add">
                        <span class="btn-icon">➕</span>
                        添加
                    </button>
                </div>
            </div>
 
            <!-- 管理操作区域 -->
            <div class="control-section">
                <h3 class="section-title">管理操作</h3>
                <div class="button-group">
                    <button onclick="generateTestData()" class="btn btn-generate">
                        <span class="btn-icon">🎲</span>
                        生成测试数据
                    </button>
                    <button onclick="startMassiveImport()" class="btn btn-massive" id="massiveImportBtn">
                        <span class="btn-icon">🚀</span>
                        插入100万数据
                    </button>
                    <button onclick="confirmClearLeaderboard()" class="btn btn-clear">
                        <span class="btn-icon">🗑️</span>
                        清空排行榜
                    </button>
                </div>
                <div id="importProgress" class="import-progress" style="display: none;">
                    <div class="progress-info">
                        <span>导入进度：</span>
                        <span id="progressText">0%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progressBar"></div>
                    </div>
                    <div class="progress-stats">
                        <span>已导入：<span id="importedCount">0</span></span>
                        <span>速度：<span id="importSpeed">0</span>/秒</span>
                        <span>剩余时间：<span id="remainingTime">--</span></span>
                    </div>
                </div>
            </div>
        </div>
 
        <!-- 排行榜主体 -->
        <div class="leaderboard-container">
            <div class="leaderboard-header">
                <h2 class="leaderboard-title">
                    <span class="crown">👑</span>
                    全球排行榜 TOP 30
                    <span class="crown">👑</span>
                </h2>
            </div>
            
            <div class="leaderboard" id="leaderboard">
                <div class="loading">
                    <div class="loading-spinner"></div>
                    <span>加载中...</span>
                </div>
            </div>
        </div>
    </div>
 
    <!-- 确认对话框 -->
    <div id="confirmDialog" class="modal">
        <div class="modal-content">
            <h3 class="modal-title">确认操作</h3>
            <p class="modal-message" id="confirmMessage">确定要执行此操作吗？</p>
            <div class="modal-buttons">
                <button onclick="confirmAction()" class="btn btn-confirm">确定</button>
                <button onclick="cancelAction()" class="btn btn-cancel">取消</button>
            </div>
        </div>
    </div>
 
    <!-- 通知容器 -->
    <div id="notificationContainer" class="notification-container"></div>
 
    <script src="script.js"></script>
</body>
</html>

```

## **<font style="color:#1a1a1a;">style.css 前端 CSS</font>**
```css
/* style.css - 炫酷游戏排行榜样式 */
 
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
 
body {
    font-family: 'Orbitron', 'Arial', sans-serif;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    color: #ffffff;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
}
 
/* 动态星空背景 */
.background {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
}
 
.stars, .stars2, .stars3 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: repeat;
    background-size: 1000px 1000px;
    animation: animateStars 100s linear infinite;
}
 
.stars {
    background-image: radial-gradient(2px 2px at 20px 30px, #eee, transparent),
                      radial-gradient(2px 2px at 40px 70px, #eee, transparent),
                      radial-gradient(1px 1px at 50px 50px, #eee, transparent),
                      radial-gradient(1px 1px at 80px 10px, #eee, transparent);
}
 
.stars2 {
    background-image: radial-gradient(3px 3px at 150px 150px, #ddd, transparent),
                      radial-gradient(2px 2px at 250px 250px, #ddd, transparent),
                      radial-gradient(2px 2px at 350px 350px, #ddd, transparent);
    animation-duration: 150s;
}
 
.stars3 {
    background-image: radial-gradient(1px 1px at 300px 300px, #bbb, transparent),
                      radial-gradient(1px 1px at 400px 400px, #bbb, transparent);
    animation-duration: 200s;
}
 
@keyframes animateStars {
    from { transform: translateY(0px); }
    to { transform: translateY(-1000px); }
}
 
/* 主容器 */
.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
    position: relative;
    z-index: 1;
}
 
/* 标题区域 */
.header {
    text-align: center;
    margin-bottom: 40px;
    animation: slideDown 0.8s ease-out;
}
 
@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
 
.title {
    margin-bottom: 20px;
}
 
.title-main {
    display: block;
    font-size: 4rem;
    font-weight: 900;
    background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
    animation: glow 2s ease-in-out infinite alternate;
}
 
.title-sub {
    display: block;
    font-size: 1.2rem;
    font-weight: 400;
    color: #888;
    letter-spacing: 5px;
    margin-top: 10px;
}
 
@keyframes glow {
    from { filter: brightness(1); }
    to { filter: brightness(1.3); }
}
 
/* 统计栏 */
.stats-bar {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 20px;
}
 
.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 30px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
}
 
.stat-label {
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 5px;
}
 
.stat-value {
    font-size: 1.8rem;
    font-weight: 700;
    color: #00ffff;
}
 
.pulse {
    animation: pulse 1s infinite;
}
 
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}
 
/* 控制面板 */
.control-panel {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}
 
.control-section {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 25px;
    backdrop-filter: blur(10px);
    transition: all 0.3s;
}
 
.control-section:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(0, 255, 255, 0.1);
}
 
.section-title {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #00ffff;
    display: flex;
    align-items: center;
    gap: 10px;
}
 
.section-title::before {
    content: '';
    width: 4px;
    height: 20px;
    background: linear-gradient(180deg, #00ffff, #ff00ff);
    border-radius: 2px;
}
 
/* 输入组 */
.input-group {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
}
 
.neon-input {
    flex: 1;
    padding: 12px 20px;
    background: rgba(0, 0, 0, 0.3);
    border: 2px solid rgba(0, 255, 255, 0.3);
    border-radius: 10px;
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s;
    font-family: inherit;
}
 
.neon-input:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
}
 
.neon-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
}
 
/* 按钮样式 */
.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    font-family: inherit;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    position: relative;
    overflow: hidden;
}
 
.btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}
 
.btn:hover::before {
    width: 300px;
    height: 300px;
}
 
.btn-icon {
    font-size: 1.2rem;
}
 
.btn-search {
    background: linear-gradient(135deg, #667eea, #764ba2);
}
 
.btn-search:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}
 
.btn-add {
    background: linear-gradient(135deg, #00d2ff, #3a47d5);
}
 
.btn-add:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(0, 210, 255, 0.4);
}
 
.btn-generate {
    background: linear-gradient(135deg, #f093fb, #f5576c);
}
 
.btn-generate:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(240, 147, 251, 0.4);
}
 
.btn-massive {
    background: linear-gradient(135deg, #fa709a, #fee140);
}
 
.btn-massive:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(250, 112, 154, 0.4);
}
 
.btn-massive:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
 
.btn-clear {
    background: linear-gradient(135deg, #ff6b6b, #c44569);
}
 
.btn-clear:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(255, 107, 107, 0.4);
}
 
.button-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}
 
/* 搜索结果 */
.search-result {
    margin-top: 15px;
    padding: 15px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    border: 1px solid rgba(0, 255, 255, 0.3);
    display: none;
    animation: fadeIn 0.3s;
}
 
.search-result.show {
    display: block;
}
 
.search-result.success {
    border-color: rgba(0, 255, 0, 0.5);
    background: rgba(0, 255, 0, 0.1);
}
 
.search-result.not-found {
    border-color: rgba(255, 0, 0, 0.5);
    background: rgba(255, 0, 0, 0.1);
}
 
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
 
/* 导入进度 */
.import-progress {
    margin-top: 20px;
    padding: 20px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    border: 1px solid rgba(0, 255, 255, 0.3);
}
 
.progress-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 1.1rem;
}
 
.progress-bar {
    width: 100%;
    height: 20px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 15px;
}
 
.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #00d2ff, #3a47d5);
    border-radius: 10px;
    transition: width 0.3s;
    box-shadow: 0 0 10px rgba(0, 210, 255, 0.5);
    position: relative;
    overflow: hidden;
}
 
.progress-fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shimmer 2s infinite;
}
 
@keyframes shimmer {
    from { transform: translateX(-100%); }
    to { transform: translateX(100%); }
}
 
.progress-stats {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #888;
}
 
.progress-stats span {
    color: #00ffff;
}
 
/* 排行榜容器 */
.leaderboard-container {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 30px;
    backdrop-filter: blur(10px);
    animation: slideUp 0.8s ease-out;
}
 
@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
 
.leaderboard-header {
    text-align: center;
    margin-bottom: 30px;
}
 
.leaderboard-title {
    font-size: 2rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}
 
.crown {
    font-size: 2.5rem;
    animation: bounce 2s infinite;
}
 
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}
 
/* 排行榜列表 */
.leaderboard {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 800px;
    overflow-y: auto;
    padding-right: 10px;
}
 
.leaderboard::-webkit-scrollbar {
    width: 10px;
}
 
.leaderboard::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
}
 
.leaderboard::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #00ffff, #ff00ff);
    border-radius: 5px;
}
 
.leaderboard-item {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s;
    animation: slideIn 0.5s ease-out backwards;
}
 
.leaderboard-item:hover {
    transform: translateX(10px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(0, 255, 255, 0.3);
    box-shadow: 0 5px 20px rgba(0, 255, 255, 0.2);
}
 
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
 
.rank {
    width: 60px;
    font-size: 1.5rem;
    font-weight: 900;
    text-align: center;
    color: #888;
}
 
/* 前三名特殊样式 */
.rank-1 .rank {
    background: linear-gradient(135deg, #ffd700, #ffed4e);
    -webkit-background-clip: text;
    background-clip: text; 
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
}
 
.rank-2 .rank {
    background: linear-gradient(135deg, #c0c0c0, #e8e8e8);
    -webkit-background-clip: text;
    background-clip: text; 
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px rgba(192, 192, 192, 0.5);
}
 
.rank-3 .rank {
    background: linear-gradient(135deg, #cd7f32, #f4a460);
    -webkit-background-clip: text;
    background-clip: text; 
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px rgba(205, 127, 50, 0.5);
}
 
.rank-1 {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 237, 78, 0.1));
    border-color: rgba(255, 215, 0, 0.3);
}
 
.rank-2 {
    background: linear-gradient(135deg, rgba(192, 192, 192, 0.1), rgba(232, 232, 232, 0.1));
    border-color: rgba(192, 192, 192, 0.3);
}
 
.rank-3 {
    background: linear-gradient(135deg, rgba(205, 127, 50, 0.1), rgba(244, 164, 96, 0.1));
    border-color: rgba(205, 127, 50, 0.3);
}
 
.player-info {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 0 20px;
}
 
.player-name {
    flex: 1;
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
}
 
.player-score {
    font-size: 1.4rem;
    font-weight: 700;
    color: #00ffff;
    min-width: 150px;
    text-align: right;
}
 
.score-label {
    font-size: 0.9rem;
    color: #888;
    margin-left: 5px;
}
 
/* 奖牌图标 */
.medal {
    font-size: 2rem;
    margin-right: 10px;
}
 
/* 加载动画 */
.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px;
}
 
.loading-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(0, 255, 255, 0.1);
    border-top-color: #00ffff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}
 
@keyframes spin {
    to { transform: rotate(360deg); }
}
 
/* 模态框 */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    z-index: 1000;
    animation: fadeIn 0.3s;
}
 
.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    padding: 30px;
    border-radius: 20px;
    border: 2px solid rgba(0, 255, 255, 0.3);
    min-width: 400px;
    animation: scaleIn 0.3s;
}
 
@keyframes scaleIn {
    from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}
 
.modal-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #00ffff;
}
 
.modal-message {
    margin-bottom: 30px;
    color: #ddd;
    font-size: 1.1rem;
}
 
.modal-buttons {
    display: flex;
    gap: 15px;
    justify-content: flex-end;
}
 
.btn-confirm {
    background: linear-gradient(135deg, #00d2ff, #3a47d5);
}
 
.btn-cancel {
    background: linear-gradient(135deg, #667eea, #764ba2);
}
 
/* 通知 */
.notification-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 2000;
}
 
.notification {
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 10px;
    padding: 15px 20px;
    margin-bottom: 10px;
    min-width: 300px;
    animation: slideInRight 0.3s;
    display: flex;
    align-items: center;
    gap: 10px;
}
 
@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(100px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
 
.notification.success {
    border-color: rgba(0, 255, 0, 0.5);
    background: linear-gradient(135deg, rgba(0, 255, 0, 0.2), rgba(0, 200, 0, 0.2));
}
 
.notification.error {
    border-color: rgba(255, 0, 0, 0.5);
    background: linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(200, 0, 0, 0.2));
}
 
.notification-icon {
    font-size: 1.5rem;
}
 
.notification-content {
    flex: 1;
}
 
.notification-close {
    cursor: pointer;
    font-size: 1.2rem;
    opacity: 0.7;
    transition: opacity 0.3s;
}
 
.notification-close:hover {
    opacity: 1;
}
 
/* 响应式设计 */
@media (max-width: 768px) {
    .title-main {
        font-size: 2.5rem;
    }
    
    .control-panel {
        grid-template-columns: 1fr;
    }
    
    .leaderboard-item {
        padding: 10px 15px;
    }
    
    .player-info {
        gap: 10px;
        padding: 0 10px;
    }
    
    .player-name {
        font-size: 1rem;
    }
    
    .player-score {
        font-size: 1.2rem;
        min-width: 100px;
    }
}
 
/* 快速修复添加玩家输入框过大的问题 */
#newPlayerName {
    width: 140px;
    min-width: 140px;
}
 
#newPlayerScore {
    width: 90px;
    min-width: 90px;
}
 
/* 删除按钮样式 */
.leaderboard-item {
    position: relative;  /* 为删除按钮提供定位上下文 */
}
 
.delete-btn {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 0, 0, 0.1);
    border: 1px solid rgba(255, 0, 0, 0.3);
    border-radius: 8px;
    padding: 8px 12px;
    cursor: pointer;
    opacity: 0;  /* 默认隐藏 */
    transition: all 0.3s;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
 
/* 鼠标悬停在排行榜项目上时显示删除按钮 */
.leaderboard-item:hover .delete-btn {
    opacity: 1;
}
 
.delete-btn:hover {
    background: rgba(255, 0, 0, 0.2);
    border-color: rgba(255, 0, 0, 0.5);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
}
 
.delete-btn:active {
    transform: translateY(-50%) scale(0.95);
}
 
/* 前三名的删除按钮特殊样式 */
.rank-1 .delete-btn,
.rank-2 .delete-btn,
.rank-3 .delete-btn {
    background: rgba(255, 0, 0, 0.15);
    border-color: rgba(255, 0, 0, 0.4);
}
 
/* 调整玩家信息区域，为删除按钮留出空间 */
.player-info {
    padding-right: 60px;  /* 为删除按钮留出空间 */
}
 
/* 移动端优化 */
@media (max-width: 768px) {
    .delete-btn {
        opacity: 1;  /* 移动端始终显示 */
        padding: 6px 10px;
        font-size: 1rem;
    }
    
    .player-info {
        padding-right: 50px;
    }
}
 
/* 删除按钮的加载动画 */
.delete-btn.deleting {
    pointer-events: none;
    opacity: 0.5;
    animation: pulse 0.5s infinite;
}
 
@keyframes pulse {
    0%, 100% { transform: translateY(-50%) scale(1); }
    50% { transform: translateY(-50%) scale(0.9); }
}
```

## **<font style="color:#1a1a1a;"></font>**
## **<font style="color:#1a1a1a;">script.js 前端 JavaScript</font>**
```javascript
// script.js - 游戏排行榜前端逻辑
 
// API 配置
const API_URL = 'https://shengtaidahui-shanghai-927ed19f8-1310738255.ap-shanghai.app.tcloudbase.com/leaderboard';
 
// 全局变量
let refreshInterval = null;
let isImporting = false;
let confirmCallback = null;
let importWorkers = [];
let totalImported = 0;
let importStartTime = null;
 
// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    loadLeaderboard();
    startAutoRefresh();
});
 
// 自动刷新（每5秒）
function startAutoRefresh() {
    refreshInterval = setInterval(() => {
        if (!isImporting) {
            loadLeaderboard();
        }
    }, 5000);
}
 
// 加载排行榜
async function loadLeaderboard() {
    try {
        const response = await fetch(`${API_URL}?action=get_leaderboard&limit=30`);
        const data = await response.json();
        const result = parseResponse(data);
        
        // 更新总玩家数
        document.getElementById('totalPlayers').textContent = result.total_users || 0;
        
        // 渲染排行榜
        renderLeaderboard(result.leaderboard || []);
    } catch (error) {
        console.error('加载排行榜失败:', error);
        showNotification('加载失败', 'error');
    }
}
 
// 渲染排行榜 - 修改版，添加删除功能
function renderLeaderboard(leaderboard) {
    const container = document.getElementById('leaderboard');
    
    if (leaderboard.length === 0) {
        container.innerHTML = '<div class="loading">暂无数据</div>';
        return;
    }
    
    container.innerHTML = leaderboard.map((player, index) => {
        const rankClass = player.rank <= 3 ? `rank-${player.rank}` : '';
        const medal = getMedal(player.rank);
        
        return `
            <div class="leaderboard-item ${rankClass}" style="animation-delay: ${index * 0.05}s">
                <div class="rank">${player.rank}</div>
                ${medal ? `<div class="medal">${medal}</div>` : ''}
                <div class="player-info">
                    <div class="player-name">${escapeHtml(player.username)}</div>
                    <div class="player-score">
                        ${player.score.toLocaleString()}
                        <span class="score-label">分</span>
                    </div>
                </div>
                <button class="delete-btn" onclick="confirmDeletePlayer('${escapeHtml(player.username)}')" title="删除玩家">
                    <span>🗑️</span>
                </button>
            </div>
        `;
    }).join('');
}
 
// 确认删除玩家
function confirmDeletePlayer(username) {
    showConfirmDialog(
        '确认删除',
        `确定要删除玩家 "${username}" 吗？此操作不可恢复！`,
        () => deletePlayer(username)
    );
}
 
// 删除玩家
async function deletePlayer(username) {
    try {
        const response = await fetch(`${API_URL}?action=delete_user&username=${encodeURIComponent(username)}`);
        const data = await response.json();
        const result = parseResponse(data);
        
        if (result.status === 'success') {
            showNotification(`玩家 ${username} 已删除`, 'success');
            loadLeaderboard();  // 刷新排行榜
        } else {
            showNotification(result.message || '删除失败', 'error');
        }
    } catch (error) {
        console.error('删除失败:', error);
        showNotification('删除玩家失败', 'error');
    }
}
 
// 获取奖牌图标
function getMedal(rank) {
    const medals = {
        1: '🥇',
        2: '🥈',
        3: '🥉'
    };
    return medals[rank] || '';
}
 
// 查询玩家
async function searchPlayer() {
    const username = document.getElementById('searchInput').value.trim();
    const resultDiv = document.getElementById('searchResult');
    
    if (!username) {
        showNotification('请输入玩家名称', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}?action=query_user&username=${encodeURIComponent(username)}`);
        const data = await response.json();
        const result = parseResponse(data);
        
        if (result.status === 'found') {
            resultDiv.className = 'search-result show success';
            resultDiv.innerHTML = `
                <div style="font-size: 1.2rem; color: #00ff00;">✅ 找到玩家</div>
                <div style="margin-top: 10px;">
                    <div>玩家名称：<strong>${escapeHtml(result.data.username)}</strong></div>
                    <div>当前分数：<strong>${result.data.score.toLocaleString()}</strong> 分</div>
                    <div>全球排名：<strong>第 ${result.data.rank} 名</strong> / 共 ${result.data.total_users} 人</div>
                </div>
            `;
        } else {
            resultDiv.className = 'search-result show not-found';
            resultDiv.innerHTML = `
                <div style="font-size: 1.2rem; color: #ff6b6b;">❌ 未找到玩家</div>
                <div style="margin-top: 10px;">玩家 "${escapeHtml(username)}" 不存在</div>
            `;
        }
        
        // 5秒后自动隐藏
        setTimeout(() => {
            resultDiv.classList.remove('show');
        }, 5000);
    } catch (error) {
        console.error('查询失败:', error);
        showNotification('查询失败', 'error');
    }
}
 
// 添加玩家
async function addPlayer() {
    const username = document.getElementById('newPlayerName').value.trim();
    const score = parseInt(document.getElementById('newPlayerScore').value);
    
    if (!username) {
        showNotification('请输入玩家名称', 'error');
        return;
    }
    
    if (isNaN(score) || score < 0) {
        showNotification('请输入有效的分数', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}?action=submit_score&username=${encodeURIComponent(username)}&score=${score}`);
        const data = await response.json();
        const result = parseResponse(data);
        
        if (result.status === 'success') {
            showNotification(`玩家 ${username} 添加成功，排名：第 ${result.data.rank} 名`, 'success');
            
            // 清空输入框
            document.getElementById('newPlayerName').value = '';
            document.getElementById('newPlayerScore').value = '';
            
            // 刷新排行榜
            loadLeaderboard();
        } else {
            showNotification('添加失败', 'error');
        }
    } catch (error) {
        console.error('添加失败:', error);
        showNotification('添加失败', 'error');
    }
}
 
// 生成测试数据
async function generateTestData() {
    const testPlayers = [
        { username: 'DragonSlayer', score: Math.floor(Math.random() * 50000) + 50000 },
        { username: 'PhoenixRising', score: Math.floor(Math.random() * 40000) + 40000 },
        { username: 'ShadowNinja', score: Math.floor(Math.random() * 35000) + 35000 },
        { username: 'CyberWarrior', score: Math.floor(Math.random() * 30000) + 30000 },
        { username: 'MysticMage', score: Math.floor(Math.random() * 25000) + 25000 },
        { username: 'ThunderBolt', score: Math.floor(Math.random() * 20000) + 20000 },
        { username: 'IceQueen', score: Math.floor(Math.random() * 18000) + 18000 },
        { username: 'FireStorm', score: Math.floor(Math.random() * 15000) + 15000 },
        { username: 'WindWalker', score: Math.floor(Math.random() * 12000) + 12000 },
        { username: 'EarthShaker', score: Math.floor(Math.random() * 10000) + 10000 }
    ];
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'batch_import',
                scores: testPlayers
            })
        });
        
        const data = await response.json();
        const result = parseResponse(data);
        
        if (result.status === 'success') {
            showNotification(`成功生成 ${testPlayers.length} 条测试数据`, 'success');
            loadLeaderboard();
        } else {
            showNotification('生成失败', 'error');
        }
    } catch (error) {
        console.error('生成失败:', error);
        showNotification('生成测试数据失败', 'error');
    }
}
 
// 开始大量数据导入
async function startMassiveImport() {
    if (isImporting) {
        showNotification('正在导入中，请稍候...', 'warning');
        return;
    }
    
    const btn = document.getElementById('massiveImportBtn');
    const progressDiv = document.getElementById('importProgress');
    
    isImporting = true;
    totalImported = 0;
    importStartTime = Date.now();
    
    btn.disabled = true;
    btn.innerHTML = '<span class="btn-icon">⏳</span> 导入中...';
    progressDiv.style.display = 'block';
    
    // 使用Web Workers进行多线程导入
    const totalRecords = 1000000;
    const batchSize = 2000;
    const numWorkers = 60;
    const recordsPerWorker = Math.floor(totalRecords / numWorkers);
    
    // 创建导入任务
    const importPromises = [];
    for (let i = 0; i < numWorkers; i++) {
        const startIndex = i * recordsPerWorker;
        const endIndex = (i === numWorkers - 1) ? totalRecords : (i + 1) * recordsPerWorker;
        importPromises.push(importBatch(startIndex, endIndex, batchSize));
    }
    
    // 更新进度
    const progressInterval = setInterval(() => {
        updateProgress(totalRecords);
    }, 100);
    
    try {
        await Promise.all(importPromises);
        
        clearInterval(progressInterval);
        updateProgress(totalRecords);
        
        showNotification(`成功导入 ${totalImported.toLocaleString()} 条数据！`, 'success');
        
        // 重置UI
        setTimeout(() => {
            progressDiv.style.display = 'none';
            btn.disabled = false;
            btn.innerHTML = '<span class="btn-icon">🚀</span> 插入100万数据';
            isImporting = false;
            loadLeaderboard();
        }, 2000);
        
    } catch (error) {
        clearInterval(progressInterval);
        console.error('导入失败:', error);
        showNotification('导入失败', 'error');
        
        progressDiv.style.display = 'none';
        btn.disabled = false;
        btn.innerHTML = '<span class="btn-icon">🚀</span> 插入100万数据';
        isImporting = false;
    }
}
 
// 批量导入数据
async function importBatch(startIndex, endIndex, batchSize) {
    for (let i = startIndex; i < endIndex; i += batchSize) {
        const currentBatchSize = Math.min(batchSize, endIndex - i);
        const batch = [];
        
        for (let j = 0; j < currentBatchSize; j++) {
            const index = i + j;
            batch.push({
                username: generateUsername(index),
                score: generateScore()
            });
        }
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'batch_import',
                    scores: batch
                })
            });
            
            if (response.ok) {
                totalImported += currentBatchSize;
            }
        } catch (error) {
            console.error('批次导入失败:', error);
        }
    }
}
 
// 生成用户名
function generateUsername(index) {
    const prefixes = ['Player', 'Gamer', 'Pro', 'Elite', 'Master', 'Legend', 'Hero', 'Champion'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}_${index}_${randomStr}`;
}
 
// 生成分数
function generateScore() {
    // 使用正态分布生成更真实的分数
    const random = Math.random();
    if (random < 0.7) {
        // 70%的玩家在1000-30000分
        return Math.floor(Math.random() * 29000) + 1000;
    } else if (random < 0.95) {
        // 25%的玩家在30000-80000分
        return Math.floor(Math.random() * 50000) + 30000;
    } else {
        // 5%的高分玩家在80000-150000分
        return Math.floor(Math.random() * 70000) + 80000;
    }
}
 
// 更新进度
function updateProgress(total) {
    const progress = (totalImported / total) * 100;
    const elapsed = (Date.now() - importStartTime) / 1000;
    const speed = totalImported / elapsed;
    const remaining = (total - totalImported) / speed;
    
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${progress.toFixed(1)}%`;
    document.getElementById('importedCount').textContent = totalImported.toLocaleString();
    document.getElementById('importSpeed').textContent = Math.floor(speed).toLocaleString();
    document.getElementById('remainingTime').textContent = remaining > 0 ? `${Math.ceil(remaining)}秒` : '完成';
}
 
// 确认清空排行榜
function confirmClearLeaderboard() {
    showConfirmDialog(
        '确认清空',
        '确定要清空所有排行榜数据吗？此操作不可恢复！',
        clearLeaderboard
    );
}
 
// 清空排行榜
async function clearLeaderboard() {
    try {
        const response = await fetch(`${API_URL}?action=clear_leaderboard`);
        const data = await response.json();
        const result = parseResponse(data);
        
        if (result.status === 'success') {
            showNotification('排行榜已清空', 'success');
            loadLeaderboard();
        } else {
            showNotification('清空失败', 'error');
        }
    } catch (error) {
        console.error('清空失败:', error);
        showNotification('清空失败', 'error');
    }
}
 
// 显示确认对话框
function showConfirmDialog(title, message, callback) {
    const dialog = document.getElementById('confirmDialog');
    document.querySelector('.modal-title').textContent = title;
    document.getElementById('confirmMessage').textContent = message;
    confirmCallback = callback;
    dialog.style.display = 'block';
}
 
// 确认操作
function confirmAction() {
    const dialog = document.getElementById('confirmDialog');
    dialog.style.display = 'none';
    if (confirmCallback) {
        confirmCallback();
        confirmCallback = null;
    }
}
 
// 取消操作
function cancelAction() {
    const dialog = document.getElementById('confirmDialog');
    dialog.style.display = 'none';
    confirmCallback = null;
}
 
// 显示通知
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `
        <span class="notification-icon">${icons[type]}</span>
        <div class="notification-content">${message}</div>
        <span class="notification-close" onclick="this.parentElement.remove()">×</span>
    `;
    
    container.appendChild(notification);
    
    // 3秒后自动移除
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
 
// 解析响应
function parseResponse(response) {
    if (response.body && typeof response.body === 'string') {
        return JSON.parse(response.body);
    }
    return response;
}
 
// HTML转义
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
 
// 监听回车键
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchPlayer();
    }
});
 
document.getElementById('newPlayerName').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const scoreInput = document.getElementById('newPlayerScore');
        if (scoreInput.value) {
            addPlayer();
        } else {
            scoreInput.focus();
        }
    }
});
 
document.getElementById('newPlayerScore').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addPlayer();
    }
});
 
// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

```



# 附录2 装备背包代码
## index.js 云函数代码
```javascript
// index.js - 游戏装备管理云函数
const { MongoClient, ObjectId } = require('mongodb');

// MongoDB 连接配置
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
const DB_NAME = 'game_inventory';
const COLLECTION_NAME = 'items';

let cachedClient = null;
let cachedDb = null;

// 附魔池配置
const enchantmentPool = {
    // 武器
    weapon: [
        { name: '锋利', stat: 'attack', min: 5, max: 25 },
        { name: '暴击', stat: 'crit_rate', min: 0.02, max: 0.10 },
        { name: '迅捷', stat: 'attack_speed', min: 0.1, max: 0.5 },
        { name: '吸血', stat: 'life_steal', min: 0.05, max: 0.15 },
        { name: '元素伤害', stat: 'elemental_damage', min: 10, max: 50 }
    ],
    // 护甲
    armor: [
        { name: '坚固', stat: 'defense', min: 5, max: 20 },
        { name: '活力', stat: 'health', min: 50, max: 200 },
        { name: '韧性', stat: 'damage_reduction', min: 0.02, max: 0.08 },
        { name: '抗性', stat: 'all_resistance', min: 5, max: 15 },
        { name: '再生', stat: 'health_regen', min: 1, max: 10 }
    ],
    // 饰品
    accessory: [
        { name: '力量', stat: 'strength', min: 5, max: 15 },
        { name: '敏捷', stat: 'agility', min: 5, max: 15 },
        { name: '智力', stat: 'intelligence', min: 5, max: 15 },
        { name: '幸运', stat: 'luck', min: 1, max: 10 },
        { name: '经验加成', stat: 'exp_bonus', min: 0.05, max: 0.20 }
    ]
};

// 连接 MongoDB
async function connectToDatabase() {
    if (cachedClient && cachedClient.topology && cachedClient.topology.isConnected()) {
        return { client: cachedClient, db: cachedDb };
    }

    const client = new MongoClient(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();
    const db = client.db(DB_NAME);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
}

// 解析请求参数
function parseRequestParams(event) {
    let params = {};

    // 处理 GET 请求参数
    if (event.queryStringParameters) {
        params = { ...event.queryStringParameters };
    }

    // 处理 POST 请求body
    if (event.body) {
        let bodyData = {};

        if (typeof event.body === 'string') {
            try {
                bodyData = JSON.parse(event.body);
            } catch (e) {
                console.log('Body解析失败:', e);
            }
        } else if (typeof event.body === 'object') {
            bodyData = event.body;
        }

        params = { ...params, ...bodyData };
    }

    // 兼容直接传入的参数
    if (!params.action && event.action) {
        params = { ...params, ...event };
    }

    return params;
}

// CORS headers
function getCORSHeaders() {
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
    };
}

// 生成随机数
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成随机浮点数
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

// 生成随机属性
function generateRandomStats(itemType) {
    const baseStats = {
        // 武器
        weapon: {
            // 攻击力
            attack: randomInt(10, 100),
            // 暴击率
            crit_rate: randomFloat(0.05, 0.25),
            // 攻击速度
            attack_speed: randomFloat(0.8, 2.0)
        },
        // 护甲
        armor: {
            // 防御力
            defense: randomInt(5, 50),
            // 生命值
            health: randomInt(50, 500),
            // 抗性
            resistance: {
                // 火焰抗性
                fire: randomInt(0, 30),
                // 冰冻抗性
                ice: randomInt(0, 30),
                // 雷电抗性
                thunder: randomInt(0, 30)
            }
        },
        // 饰品
        accessory: {
            bonus_stats: [
                // 力量
                { type: 'strength', value: randomInt(1, 20) },
                // 敏捷
                { type: 'agility', value: randomInt(1, 20) },
                // 智力
                { type: 'intelligence', value: randomInt(1, 20) }
            ]
        }
    };

    return baseStats[itemType] || {};
}

// 生成装备
function generateItem(name, itemType, rarity, level) {
    const rarities = {
        common: { color: '#808080', quality: 1 },
        rare: { color: '#0066cc', quality: 2 },
        epic: { color: '#9932cc', quality: 3 },
        legendary: { color: '#ff8c00', quality: 4 }
    };

    const item = {
        name: name,
        type: itemType,
        rarity: rarity, // 稀有度
        level: level, // 等级
        color: rarities[rarity].color, // 颜色
        quality: rarities[rarity].quality, // 质量
        stats: generateRandomStats(itemType), // 属性
        created_at: new Date(), // 创建时间
        enchantments: [], // 附魔
    };

    // 传奇装备特殊效果
    if (rarity === 'legendary') {
        item.special_effect = {
            name: '烈焰之怒',
            description: '攻击时有20%概率造成额外火焰伤害',
            proc_chance: 0.2,
            damage_type: 'fire',
            damage_range: [50, 150]
        };
    }

    return item;
}

// 生成随机附魔
function generateRandomEnchantment(itemType) {
    const pool = enchantmentPool[itemType] || enchantmentPool.accessory;
    const enchant = pool[randomInt(0, pool.length - 1)];

    // 生成随机数值
    let value;
    if (typeof enchant.min === 'number' && enchant.min % 1 !== 0) {
        value = randomFloat(enchant.min, enchant.max);
    } else {
        value = randomInt(enchant.min, enchant.max);
    }

    // 随机附魔品质
    const qualityRoll = Math.random();
    let quality, color;

    if (qualityRoll < 0.1) {  // 10%概率获得完美附魔
        quality = 'perfect';
        value = value * 1.5;
        color = '#ff6b6b';
    } else if (qualityRoll < 0.3) {  // 20%概率获得优秀附魔
        quality = 'excellent';
        value = value * 1.2;
        color = '#ffd93d';
    } else {  // 70%概率获得普通附魔
        quality = 'normal';
        color = '#6bcf7f';
    }

    return {
        name: enchant.name,
        stat: enchant.stat,
        value: typeof value === 'number' && value % 1 !== 0 ?
            Math.round(value * 100) / 100 : Math.floor(value),
        quality: quality,
        color: color,
        timestamp: new Date()
    };
}

// 初始化示例数据
async function initSampleData(db) {
    const collection = db.collection(COLLECTION_NAME);

    let sampleItems = [
        ['炎魔之剑', 'weapon', 'legendary', 100],
        ['寒冰护甲', 'armor', 'epic', 55],
        ['雷霆之戒', 'accessory', 'rare', 45],
        ['钢铁长剑', 'weapon', 'common', 20],
        ['魔法护符', 'accessory', 'epic', 50],
        ['龙鳞胸甲', 'armor', 'legendary', 65],
        ['疾风之靴', 'armor', 'rare', 40],
        ['智慧之冠', 'armor', 'epic', 52],
    ];
    sampleItems = [...sampleItems].sort(() => Math.random() - 0.5);

    const items = sampleItems.map(itemData => generateItem(...itemData));
    await collection.insertMany(items);

    return { message: 'Sample data initialized successfully', count: items.length };
}

// 清空示例数据
async function deleteSampleData(db) {
    const collection = db.collection(COLLECTION_NAME);
    await collection.deleteMany({});
    return { message: 'Sample data deleted successfully' };
}

// 主函数
exports.main = async (event, context) => {
    try {
        const params = parseRequestParams(event);
        const { action } = params;

        // 连接数据库
        const { db } = await connectToDatabase();
        const collection = db.collection(COLLECTION_NAME);

        let result;

        switch (action) {
            case 'init_data':
                result = await initSampleData(db);
                break;

            case 'delete_data':
                result = await deleteSampleData(db);
                break;

            case 'get_items':
                const items = await collection.find({}).toArray();
                result = items.map(item => ({
                    ...item,
                    _id: item._id.toString()
                }));
                break;

            case 'get_item':
                const { item_id } = params;
                if (!item_id) {
                    return {
                        statusCode: 400,
                        headers: getCORSHeaders(),
                        body: JSON.stringify({ error: 'item_id is required' })
                    };
                }

                const item = await collection.findOne({ _id: new ObjectId(item_id) });
                if (item) {
                    result = { ...item, _id: item._id.toString() };
                } else {
                    return {
                        statusCode: 404,
                        headers: getCORSHeaders(),
                        body: JSON.stringify({ error: 'Item not found' })
                    };
                }
                break;

            case 'create_item':
                const { name, type, rarity, level } = params;
                if (!name || !type || !rarity || !level) {
                    return {
                        statusCode: 400,
                        headers: getCORSHeaders(),
                        body: JSON.stringify({
                            error: 'Missing required fields: name, type, rarity, level'
                        })
                    };
                }

                const newItem = generateItem(name, type, rarity, parseInt(level));
                const insertResult = await collection.insertOne(newItem);
                result = {
                    ...newItem,
                    _id: insertResult.insertedId.toString()
                };
                break;

            case 'delete_item':
                const { item_id: deleteId } = params;
                if (!deleteId) {
                    return {
                        statusCode: 400,
                        headers: getCORSHeaders(),
                        body: JSON.stringify({ error: 'item_id is required' })
                    };
                }

                const deleteResult = await collection.deleteOne({
                    _id: new ObjectId(deleteId)
                });

                if (deleteResult.deletedCount > 0) {
                    result = { message: 'Item deleted successfully' };
                } else {
                    return {
                        statusCode: 404,
                        headers: getCORSHeaders(),
                        body: JSON.stringify({ error: 'Item not found' })
                    };
                }
                break;

            case 'enchant_item':
                const { item_id: enchantId } = params;
                if (!enchantId) {
                    return {
                        statusCode: 400,
                        headers: getCORSHeaders(),
                        body: JSON.stringify({ error: 'item_id is required' })
                    };
                }

                // 获取装备信息
                const itemToEnchant = await collection.findOne({
                    _id: new ObjectId(enchantId)
                });

                if (!itemToEnchant) {
                    return {
                        statusCode: 404,
                        headers: getCORSHeaders(),
                        body: JSON.stringify({ error: 'Item not found' })
                    };
                }

                // 检查附魔次数限制
                const currentEnchantments = itemToEnchant.enchantments?.length || 0;
                if (currentEnchantments >= 3) {
                    return {
                        statusCode: 400,
                        headers: getCORSHeaders(),
                        body: JSON.stringify({
                            error: 'Maximum enchantments reached',
                            message: '该装备已达到最大附魔次数（3次）'
                        })
                    };
                }

                // 生成随机附魔
                const enchantment = generateRandomEnchantment(itemToEnchant.type);

                // 更新装备
                await collection.updateOne(
                    { _id: new ObjectId(enchantId) },
                    { $push: { enchantments: enchantment } }
                );

                result = {
                    success: true,
                    enchantment: enchantment,
                    message: `成功附魔：${enchantment.name} +${enchantment.value}`
                };
                break;

            default:
                result = {
                    message: '游戏装备管理API',
                    availableActions: [
                        'init_data - 初始化示例数据',
                        'delete_data - 清空示例数据',
                        'get_items - 获取所有装备',
                        'get_item - 获取单个装备（需要item_id）',
                        'create_item - 创建新装备（需要name, type, rarity, level）',
                        'delete_item - 删除装备（需要item_id）',
                        'enchant_item - 附魔装备（需要item_id）'
                    ]
                };
        }

        return {
            statusCode: 200,
            headers: getCORSHeaders(),
            body: JSON.stringify(result)
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: getCORSHeaders(),
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message
            })
        };
    }
};

```



## package.json 云函数依赖
```json
{
  "name": "game-inventory-cloud-function",
  "version": "1.0.0",
  "description": "游戏装备管理云函数",
  "license": "ISC",
  "author": "",
  "type": "commonjs",
  "main": "index.js",
  "dependencies": {
    "mongodb": "~6.3.0"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```



## index.html 前端 HTML
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>游戏装备背包</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="game-container">
    <h1 class="game-title">装备背包系统</h1>

    <div class="main-content">
        <!-- 背包区域 -->
        <div class="inventory-section">
            <h2>背包</h2>
            <div class="inventory-grid" id="inventory-grid">
                <!-- 装备格子将通过JavaScript动态生成 -->
            </div>
        </div>

        <!-- 装备详情区域 -->
        <div class="detail-section">
            <h2>装备详情</h2>
            <div id="item-detail" class="item-detail">
                <p class="no-selection">点击装备查看详情</p>
            </div>
        </div>
    </div>

    <!-- 控制按钮 -->
    <div class="controls">
        <button class="btn btn-primary" onclick="initSampleData()">初始化示例数据</button>
        <button class="btn btn-danger" onclick="deleteSampleData()">清空示例数据</button>
        <button class="btn btn-success" onclick="showCreateItemModal()">创建新装备</button>
    </div>
</div>

<!-- 创建装备模态框 -->
<div id="create-modal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <h3>创建新装备</h3>
        <form id="create-item-form">
            <input type="text" id="item-name" placeholder="装备名称" required>
            <select id="item-type" required>
                <option value="">选择类型</option>
                <option value="weapon">武器</option>
                <option value="armor">护甲</option>
                <option value="accessory">饰品</option>
            </select>
            <select id="item-rarity" required>
                <option value="">选择稀有度</option>
                <option value="common">普通</option>
                <option value="rare">稀有</option>
                <option value="epic">史诗</option>
                <option value="legendary">传说</option>
            </select>
            <input type="number" id="item-level" placeholder="等级" min="1" max="100" required>
            <button type="submit" class="btn btn-primary">创建</button>
        </form>
    </div>
</div>

<!-- 确认对话框 -->
<div id="confirm-dialog" class="modal">
    <div class="dialog-content">
        <div class="dialog-header">
            <h3 id="dialog-title">确认操作</h3>
        </div>
        <div class="dialog-body">
            <p id="dialog-message"></p>
        </div>
        <div class="dialog-footer">
            <button class="btn btn-danger" onclick="confirmAction()">确认</button>
            <button class="btn btn-secondary" onclick="cancelAction()">取消</button>
        </div>
    </div>
</div>

<!-- 附魔对话框 -->
<div id="enchant-dialog" class="modal">
    <div class="enchant-content">
        <div class="enchant-header">
            <h3>装备附魔</h3>
            <span class="close" onclick="closeEnchantDialog()">&times;</span>
        </div>
        <div class="enchant-body">
            <div class="enchant-item-preview">
                <h4 id="enchant-item-name"></h4>
                <p id="enchant-item-type"></p>
            </div>
            <div class="enchant-animation" id="enchant-animation">
                <div class="magic-circle"></div>
                <div class="enchant-particles"></div>
            </div>
            <div class="enchant-result" id="enchant-result">
                <!-- 附魔结果将显示在这里 -->
            </div>
        </div>
        <div class="enchant-footer">
            <button class="btn btn-primary" id="enchant-btn" onclick="performEnchantment()">
                <span class="enchant-icon">✨</span> 开始附魔
            </button>
            <button class="btn btn-secondary" onclick="closeEnchantDialog()">关闭</button>
        </div>
    </div>
</div>

<!-- 通知容器 -->
<div id="notification-container" class="notification-container"></div>

<script src="script.js"></script>
</body>
</html>
```



## style.css 前端 CSS
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(to bottom, #1a1a2e, #0f0f1e);
    color: #ffffff;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.game-container {
    width: 90%;
    max-width: 1200px;
    background: rgba(0, 0, 0, 0.8);
    border: 2px solid #4a4a6a;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
}

.game-title {
    text-align: center;
    color: #ffd700;
    font-size: 2.5em;
    margin-bottom: 30px;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.main-content {
    display: flex;
    gap: 30px;
    margin-bottom: 20px;
}

/* 背包样式 */
.inventory-section {
    flex: 1;
}

.inventory-section h2,
.detail-section h2 {
    color: #87ceeb;
    margin-bottom: 15px;
    font-size: 1.5em;
}

.inventory-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 5px;
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border: 2px solid #4a4a6a;
    border-radius: 5px;
}

.inventory-slot {
    width: 60px;
    height: 60px;
    background: rgba(30, 30, 40, 0.8);
    border: 2px solid #3a3a4a;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
}

.inventory-slot:hover {
    border-color: #87ceeb;
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(135, 206, 235, 0.5);
}

.inventory-slot.occupied {
    background: rgba(40, 40, 50, 0.9);
}

.item-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    position: relative;
}

.item-level {
    position: absolute;
    bottom: 2px;
    right: 2px;
    font-size: 12px;
    color: #ffd700;
    background: rgba(0, 0, 0, 0.7);
    padding: 1px 4px;
    border-radius: 3px;
}

/* 装备详情样式 */
.detail-section {
    width: 350px;
}

.item-detail {
    background: rgba(0, 0, 0, 0.5);
    border: 2px solid #4a4a6a;
    border-radius: 5px;
    padding: 20px;
    min-height: 400px;
}

.item-detail h3 {
    font-size: 1.5em;
    margin-bottom: 10px;
}

.item-type {
    color: #87ceeb;
    font-size: 0.9em;
    margin-bottom: 15px;
}

.stats-list {
    list-style: none;
    margin: 20px 0;
}

.stats-list li {
    margin: 8px 0;
    padding: 5px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
}

.stat-name {
    color: #87ceeb;
}

.stat-value {
    color: #ffd700;
    float: right;
}

.special-effect {
    background: rgba(255, 140, 0, 0.1);
    border: 1px solid #ff8c00;
    border-radius: 5px;
    padding: 10px;
    margin-top: 15px;
}

.special-effect h4 {
    color: #ff8c00;
    margin-bottom: 5px;
}

.no-selection {
    color: #666;
    text-align: center;
    margin-top: 150px;
}

/* 控制按钮 */
.controls {
    text-align: center;
    margin-top: 20px;
}

.btn {
    padding: 10px 20px;
    margin: 0 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
}

.btn-primary {
    background: #4169e1;
    color: white;
}

.btn-primary:hover {
    background: #1e90ff;
    transform: scale(1.05);
}

.btn-success {
    background: #32cd32;
    color: white;
}

.btn-success:hover {
    background: #00ff00;
    transform: scale(1.05);
}

.btn-danger {
    background: #dc143c;
    color: white;
}

.btn-danger:hover {
    background: #ff0000;
    transform: scale(1.05);
}

/* 模态框样式 */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
}

.modal-content {
    background-color: #2a2a3a;
    margin: 10% auto;
    padding: 20px;
    border: 2px solid #4a4a6a;
    border-radius: 10px;
    width: 400px;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover {
    color: #fff;
}

#create-item-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
}

#create-item-form input,
#create-item-form select {
    padding: 10px;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid #4a4a6a;
    border-radius: 5px;
    color: white;
}

/* 稀有度颜色 */
.rarity-common { color: #808080 !important; }
.rarity-rare { color: #0066cc !important; }
.rarity-epic { color: #9932cc !important; }
.rarity-legendary { color: #ff8c00 !important; }

/* 响应式设计 */
@media (max-width: 768px) {
    .main-content {
        flex-direction: column;
    }
    
    .detail-section {
        width: 100%;
    }
    
    .inventory-grid {
        grid-template-columns: repeat(5, 1fr);
    }
}

/* 确认对话框样式 */
.dialog-content {
    background-color: #2a2a3a;
    margin: 20% auto;
    padding: 0;
    border: 2px solid #4a4a6a;
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    animation: dialogSlideIn 0.3s ease-out;
}

@keyframes dialogSlideIn {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.dialog-header {
    background: linear-gradient(to right, #dc143c, #8b0000);
    padding: 15px 20px;
    border-radius: 8px 8px 0 0;
}

.dialog-header h3 {
    margin: 0;
    color: white;
}

.dialog-body {
    padding: 20px;
    text-align: center;
}

.dialog-body p {
    font-size: 16px;
    color: #ffffff;
    margin: 10px 0;
}

.dialog-footer {
    padding: 15px 20px;
    text-align: center;
    border-top: 1px solid #4a4a6a;
}

/* 附魔对话框样式 */
.enchant-content {
    background-color: #1a1a2e;
    margin: 10% auto;
    padding: 0;
    border: 2px solid #6a4a8a;
    border-radius: 15px;
    width: 500px;
    box-shadow: 0 0 30px rgba(106, 74, 138, 0.8);
    animation: enchantGlow 2s ease-in-out infinite;
}

@keyframes enchantGlow {
    0%, 100% {
        box-shadow: 0 0 30px rgba(106, 74, 138, 0.8);
    }
    50% {
        box-shadow: 0 0 50px rgba(147, 50, 204, 1);
    }
}

.enchant-header {
    background: linear-gradient(to right, #9932cc, #6a4a8a);
    padding: 15px 20px;
    border-radius: 13px 13px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.enchant-header h3 {
    margin: 0;
    color: white;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.enchant-body {
    padding: 20px;
    min-height: 300px;
}

.enchant-item-preview {
    text-align: center;
    margin-bottom: 20px;
    padding: 15px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

.enchant-item-preview h4 {
    margin: 0 0 5px 0;
    font-size: 20px;
}

.enchant-animation {
    position: relative;
    height: 150px;
    display: none;
    align-items: center;
    justify-content: center;
}

.magic-circle {
    width: 100px;
    height: 100px;
    border: 3px solid #9932cc;
    border-radius: 50%;
    animation: rotate 2s linear infinite;
    box-shadow: 0 0 20px #9932cc;
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.enchant-particles {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: 
        radial-gradient(circle, #9932cc 1px, transparent 1px),
        radial-gradient(circle, #ff8c00 1px, transparent 1px);
    background-size: 50px 50px;
    background-position: 0 0, 25px 25px;
    animation: particleFloat 3s linear infinite;
}

@keyframes particleFloat {
    from { transform: translateY(0); }
    to { transform: translateY(-20px); }
}

.enchant-result {
    text-align: center;
    padding: 20px;
    display: none;
}

.enchant-success {
    color: #6bcf7f;
    font-size: 24px;
    font-weight: bold;
    text-shadow: 0 0 10px rgba(107, 207, 127, 0.8);
    animation: successPulse 0.5s ease-out;
}

@keyframes successPulse {
    0% { transform: scale(0); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}

.enchant-stat {
    margin: 10px 0;
    padding: 10px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    font-size: 18px;
}

.enchant-footer {
    padding: 15px 20px;
    text-align: center;
    border-top: 1px solid #6a4a8a;
}

.enchant-icon {
    margin-right: 5px;
}

.btn-secondary {
    background: #666;
    color: white;
}

.btn-secondary:hover {
    background: #888;
}

/* 通知系统样式 */
.notification-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 2000;
}

.notification {
    background: rgba(0, 0, 0, 0.9);
    border-radius: 10px;
    padding: 15px 20px;
    margin-bottom: 10px;
    min-width: 300px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    animation: notificationSlideIn 0.3s ease-out;
    display: flex;
    align-items: center;
    gap: 10px;
}

@keyframes notificationSlideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.notification.success {
    border-left: 4px solid #6bcf7f;
}

.notification.error {
    border-left: 4px solid #dc143c;
}

.notification.info {
    border-left: 4px solid #4169e1;
}

.notification.warning {
    border-left: 4px solid #ffd93d;
}

.notification-icon {
    font-size: 24px;
}

.notification-content {
    flex: 1;
}

.notification-title {
    font-weight: bold;
    margin-bottom: 5px;
}

.notification-message {
    font-size: 14px;
    color: #ccc;
}

.notification-close {
    cursor: pointer;
    font-size: 20px;
    color: #999;
    transition: color 0.3s;
}

.notification-close:hover {
    color: #fff;
}

/* 附魔品质颜色 */
.enchant-quality-perfect {
    color: #ff6b6b !important;
    text-shadow: 0 0 5px rgba(255, 107, 107, 0.8);
}

.enchant-quality-excellent {
    color: #ffd93d !important;
    text-shadow: 0 0 5px rgba(255, 217, 61, 0.8);
}

.enchant-quality-normal {
    color: #6bcf7f !important;
    text-shadow: 0 0 5px rgba(107, 207, 127, 0.8);
}
```



## script.js 前端 JavaScript
```javascript
// script.js - 云函数版本

// API 配置
const API_URL = 'https://shengtaidahui-shanghai-927ed19f8-1310738255.ap-shanghai.app.tcloudbase.com/backpack';
let currentItems = [];
let selectedItem = null;
let confirmCallback = null;
let currentEnchantingItem = null;

// 页面加载时获取装备列表
window.onload = function() {
    loadItems();
};

// 解析云函数响应
function parseCloudResponse(response) {
    // 云函数可能将实际数据包装在body字段中
    if (response.body && typeof response.body === 'string') {
        return JSON.parse(response.body);
    }
    return response;
}

// 通知系统
function showNotification(title, message, type = 'info') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };

    notification.innerHTML = `
        <span class="notification-icon">${icons[type]}</span>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <span class="notification-close" onclick="this.parentElement.remove()">×</span>
    `;

    container.appendChild(notification);

    // 自动移除通知
    setTimeout(() => {
        notification.style.animation = 'notificationSlideOut 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// 自定义确认对话框
function showConfirmDialog(title, message, callback) {
    const dialog = document.getElementById('confirm-dialog');
    document.getElementById('dialog-title').textContent = title;
    document.getElementById('dialog-message').textContent = message;
    confirmCallback = callback;
    dialog.style.display = 'block';
}

function confirmAction() {
    document.getElementById('confirm-dialog').style.display = 'none';
    if (confirmCallback) {
        confirmCallback();
        confirmCallback = null;
    }
}

function cancelAction() {
    document.getElementById('confirm-dialog').style.display = 'none';
    confirmCallback = null;
}

// 加载装备列表 - 云函数版本
async function loadItems() {
    try {
        // 使用GET请求调用云函数
        const response = await fetch(`${API_URL}?action=get_items`);
        const data = await response.json();
        currentItems = parseCloudResponse(data);

        // 确保currentItems是数组
        if (!Array.isArray(currentItems)) {
            console.error('Invalid items data:', currentItems);
            currentItems = [];
        }

        renderInventory();
    } catch (error) {
        console.error('Failed to load items:', error);
        showNotification('加载失败', '无法加载装备列表', 'error');
    }
}

// 渲染背包
function renderInventory() {
    const grid = document.getElementById('inventory-grid');
    grid.innerHTML = '';

    // 创建64个格子（8x8）
    for (let i = 0; i < 64; i++) {
        const slot = document.createElement('div');
        slot.className = 'inventory-slot';

        if (i < currentItems.length) {
            const item = currentItems[i];
            slot.className += ' occupied';
            slot.innerHTML = `
                <div class="item-icon rarity-${item.rarity}">
                    ${getItemIcon(item.type)}
                    <span class="item-level">Lv.${item.level}</span>
                </div>
            `;
            slot.onclick = () => selectItem(item);

            // 添加稀有度边框效果
            slot.style.borderColor = item.color;
        }

        grid.appendChild(slot);
    }
}

// 获取装备图标
function getItemIcon(type) {
    const icons = {
        'weapon': '⚔️',
        'armor': '🛡️',
        'accessory': '💎'
    };
    return icons[type] || '📦';
}

// 选择装备显示详情
function selectItem(item) {
    selectedItem = item;
    const detailDiv = document.getElementById('item-detail');

    // 构建装备详情HTML
    let html = `
        <h3 class="rarity-${item.rarity}">${item.name}</h3>
        <p class="item-type">类型: ${getTypeName(item.type)} | 等级: ${item.level}</p>
        <ul class="stats-list">
    `;

    // 显示基础属性
    if (item.stats) {
        html += renderStats(item.stats);
    }

    html += '</ul>';

    // 显示特殊效果
    if (item.special_effect) {
        html += `
            <div class="special-effect">
                <h4>${item.special_effect.name}</h4>
                <p>${item.special_effect.description}</p>
            </div>
        `;
    }

    // 显示附魔信息
    if (item.enchantments && item.enchantments.length > 0) {
        html += '<div class="enchantments"><h4>附魔:</h4><ul>';
        item.enchantments.forEach(ench => {
            const qualityClass = `enchant-quality-${ench.quality}`;
            html += `<li class="${qualityClass}">${ench.name}: +${formatEnchantValue(ench.stat, ench.value)}</li>`;
        });
        html += '</ul></div>';
    }

    // 添加操作按钮
    const enchantCount = item.enchantments ? item.enchantments.length : 0;
    const canEnchant = enchantCount < 3;

    html += `
        <div style="margin-top: 20px;">
            ${canEnchant ?
        `<button class="btn btn-primary" onclick="showEnchantDialog('${item._id}')">附魔 (${enchantCount}/3)</button>` :
        `<button class="btn btn-primary" disabled style="opacity: 0.5;">已达最大附魔次数</button>`
    }
            <button class="btn btn-danger" onclick="confirmDeleteItem('${item._id}')">销毁</button>
        </div>
    `;

    detailDiv.innerHTML = html;
}

// 格式化附魔数值
function formatEnchantValue(stat, value) {
    const percentStats = ['crit_rate', 'life_steal', 'damage_reduction', 'exp_bonus'];
    if (percentStats.includes(stat)) {
        return `${(value * 100).toFixed(1)}%`;
    }
    return value;
}

// 渲染属性
function renderStats(stats, prefix = '') {
    let html = '';

    for (const [key, value] of Object.entries(stats)) {
        if (typeof value === 'object' && !Array.isArray(value)) {
            html += renderStats(value, key + '.');
        } else if (Array.isArray(value)) {
            value.forEach(stat => {
                if (stat.type && stat.value) {
                    const statName = getStatName(stat.type);
                    html += `<li><span class="stat-name">${statName}</span><span class="stat-value">+${stat.value}</span></li>`;
                }
            });
        } else {
            const statName = getStatName(key);
            const statValue = formatStatValue(key, value);
            html += `<li><span class="stat-name">${statName}</span><span class="stat-value">${statValue}</span></li>`;
        }
    }

    return html;
}

// 获取类型名称
function getTypeName(type) {
    const names = {
        'weapon': '武器',
        'armor': '护甲',
        'accessory': '饰品'
    };
    return names[type] || type;
}

// 获取属性名称
function getStatName(stat) {
    const names = {
        'attack': '攻击力',
        'defense': '防御力',
        'health': '生命值',
        'crit_rate': '暴击率',
        'attack_speed': '攻击速度',
        'fire': '火焰抗性',
        'ice': '冰霜抗性',
        'thunder': '雷电抗性',
        'life_steal': '生命偷取',
        'elemental_damage': '元素伤害',
        'damage_reduction': '伤害减免',
        'all_resistance': '全部抗性',
        'health_regen': '生命回复',
        'strength': '力量',
        'agility': '敏捷',
        'intelligence': '智力',
        'luck': '幸运',
        'exp_bonus': '经验加成'
    };
    return names[stat] || stat;
}

// 格式化属性值
function formatStatValue(stat, value) {
    if (stat === 'crit_rate') {
        return `${(value * 100).toFixed(1)}%`;
    } else if (stat === 'attack_speed') {
        return `${value.toFixed(1)}`;
    } else if (stat.includes('resistance') || stat.includes('fire') || stat.includes('ice') || stat.includes('thunder')) {
        return `${value}%`;
    }
    return value;
}

// 初始化示例数据 - 云函数版本
async function initSampleData() {
    try {
        // 使用POST请求调用云函数
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'init_data' })
        });

        const data = await response.json();
        const result = parseCloudResponse(data);

        await loadItems();
        showNotification('初始化成功', result.message || '示例数据已加载', 'success');
    } catch (error) {
        console.error('Failed to init data:', error);
        showNotification('初始化失败', '无法初始化示例数据', 'error');
    }
}

// 初始化示例数据 - 云函数版本
async function deleteSampleData() {
    try {
        // 使用POST请求调用云函数
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'delete_data' })
        });

        const data = await response.json();
        const result = parseCloudResponse(data);

        await loadItems();
        showNotification('删除成功', result.message || '示例数据已删除', 'success');
    } catch (error) {
        console.error('Failed to init data:', error);
        showNotification('删除失败', '无法删除示例数据', 'error');
    }
}

// 显示创建装备模态框
function showCreateItemModal() {
    document.getElementById('create-modal').style.display = 'block';
}

// 关闭模态框
function closeModal() {
    document.getElementById('create-modal').style.display = 'none';
    document.getElementById('create-item-form').reset();
}

// 创建装备表单提交 - 云函数版本
document.getElementById('create-item-form').onsubmit = async function(e) {
    e.preventDefault();

    const itemData = {
        action: 'create_item',
        name: document.getElementById('item-name').value,
        type: document.getElementById('item-type').value,
        rarity: document.getElementById('item-rarity').value,
        level: parseInt(document.getElementById('item-level').value)
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemData)
        });

        if (response.ok) {
            const data = await response.json();
            const result = parseCloudResponse(data);

            closeModal();
            await loadItems();
            showNotification('创建成功', `装备"${itemData.name}"已创建`, 'success');
        } else {
            const errorData = await response.json();
            const error = parseCloudResponse(errorData);
            showNotification('创建失败', error.error || '无法创建装备', 'error');
        }
    } catch (error) {
        console.error('Failed to create item:', error);
        showNotification('创建失败', '无法创建装备', 'error');
    }
};

// 确认删除装备
function confirmDeleteItem(itemId) {
    const item = currentItems.find(i => i._id === itemId);
    showConfirmDialog(
        '确认销毁装备',
        `确定要销毁"${item.name}"吗？此操作不可恢复！`,
        () => deleteItem(itemId)
    );
}

// 删除装备 - 云函数版本
async function deleteItem(itemId) {
    try {
        // 使用GET请求调用云函数（也可以用POST）
        const response = await fetch(`${API_URL}?action=delete_item&item_id=${itemId}`, {
            method: 'GET'
        });

        if (response.ok) {
            const data = await response.json();
            const result = parseCloudResponse(data);

            await loadItems();
            document.getElementById('item-detail').innerHTML = '<p class="no-selection">点击装备查看详情</p>';
            showNotification('销毁成功', result.message || '装备已被销毁', 'success');
        } else {
            const errorData = await response.json();
            const error = parseCloudResponse(errorData);
            showNotification('删除失败', error.error || '无法删除装备', 'error');
        }
    } catch (error) {
        console.error('Failed to delete item:', error);
        showNotification('删除失败', '无法删除装备', 'error');
    }
}

// 显示附魔对话框
function showEnchantDialog(itemId) {
    const item = currentItems.find(i => i._id === itemId);
    currentEnchantingItem = item;

    const dialog = document.getElementById('enchant-dialog');
    document.getElementById('enchant-item-name').textContent = item.name;
    document.getElementById('enchant-item-name').className = `rarity-${item.rarity}`;
    document.getElementById('enchant-item-type').textContent = `${getTypeName(item.type)} - 等级 ${item.level}`;

    // 重置界面
    document.getElementById('enchant-animation').style.display = 'none';
    document.getElementById('enchant-result').style.display = 'none';
    document.getElementById('enchant-result').innerHTML = '';
    document.getElementById('enchant-btn').disabled = false;
    document.getElementById('enchant-btn').innerHTML = '<span class="enchant-icon">✨</span> 开始附魔';

    dialog.style.display = 'block';
}

// 关闭附魔对话框
function closeEnchantDialog() {
    document.getElementById('enchant-dialog').style.display = 'none';
    currentEnchantingItem = null;
    // 刷新装备详情
    if (selectedItem) {
        const updatedItem = currentItems.find(i => i._id === selectedItem._id);
        if (updatedItem) {
            selectItem(updatedItem);
        }
    }
}

// 执行附魔 - 云函数版本
async function performEnchantment() {
    if (!currentEnchantingItem) return;

    const enchantBtn = document.getElementById('enchant-btn');
    const animationDiv = document.getElementById('enchant-animation');
    const resultDiv = document.getElementById('enchant-result');

    // 禁用按钮，显示动画
    enchantBtn.disabled = true;
    enchantBtn.innerHTML = '<span class="enchant-icon">⏳</span> 附魔中...';
    animationDiv.style.display = 'flex';
    resultDiv.style.display = 'none';

    try {
        // 使用POST请求调用云函数
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'enchant_item',
                item_id: currentEnchantingItem._id
            })
        });

        const data = await response.json();
        const result = parseCloudResponse(data);

        // 模拟附魔过程
        setTimeout(() => {
            animationDiv.style.display = 'none';

            if (response.ok && result.success) {
                // 显示成功结果
                const enchant = result.enchantment;
                resultDiv.innerHTML = `
                    <div class="enchant-success">
                        附魔成功！
                    </div>
                    <div class="enchant-stat enchant-quality-${enchant.quality}">
                        <strong>${enchant.name}</strong>: +${formatEnchantValue(enchant.stat, enchant.value)}
                    </div>
                `;
                resultDiv.style.display = 'block';

                // 更新本地数据
                loadItems();

                // 显示通知
                showNotification('附魔成功', result.message, 'success');

                // 更新按钮
                enchantBtn.innerHTML = '<span class="enchant-icon">✅</span> 附魔完成';
            } else {
                // 显示失败信息
                resultDiv.innerHTML = `
                    <div style="color: #dc143c; font-size: 18px;">
                        附魔失败：${result.message || result.error || '未知错误'}
                    </div>
                `;
                resultDiv.style.display = 'block';

                showNotification('附魔失败', result.message || result.error || '未知错误', 'error');

                enchantBtn.disabled = false;
                enchantBtn.innerHTML = '<span class="enchant-icon">✨</span> 重新附魔';
            }
        }, 2000);

    } catch (error) {
        console.error('Failed to enchant item:', error);

        setTimeout(() => {
            animationDiv.style.display = 'none';
            resultDiv.innerHTML = `
                <div style="color: #dc143c; font-size: 18px;">
                    网络错误，请重试
                </div>
            `;
            resultDiv.style.display = 'block';

            showNotification('附魔失败', '网络错误，请重试', 'error');

            enchantBtn.disabled = false;
            enchantBtn.innerHTML = '<span class="enchant-icon">✨</span> 重新附魔';
        }, 1000);
    }
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const createModal = document.getElementById('create-modal');
    const confirmDialog = document.getElementById('confirm-dialog');
    const enchantDialog = document.getElementById('enchant-dialog');

    if (event.target === createModal) {
        closeModal();
    } else if (event.target === confirmDialog) {
        cancelAction();
    } else if (event.target === enchantDialog) {
        closeEnchantDialog();
    }
};

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes notificationSlideOut {
        to {
            transform: translateX(120%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
```

