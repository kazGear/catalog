const PELIOD_STR_LENGTH = 7;
const HALF_SPACE = "&nbsp;";
const WHOLE_SPACE = "&emsp;";
const MY_BIRTH_DAY = "1987/08/23";

const addEventOpenWindow = () => {
    $("#characterButton").click(() => {
        $("#backFilter").show();
        $("#modalWindow").show();
        $("body").css({"overflow": "hidden"});
    });
};

const addEventCloseWindow = () => {
    $("#characterCloseButton").click(() => {
        $("#backFilter").hide();
        $("#modalWindow").hide();
        $("body").css({"overflow": "scroll"});
    });
};

const calcBirthDay = () => {
    const birthDay = new Date(MY_BIRTH_DAY);
    const today = new Date();

    const thisYearBirthDay = new Date(
        today.getFullYear(),
        birthDay.getMonth(),
        birthDay.getDate()
    );

    // おおまかに年齢を算出、調整
    let age = today.getFullYear() - birthDay.getFullYear();
    if (today < thisYearBirthDay) age--;

    $("#myAge").text(age);
};

const textDecoration = () => {
    const decoLeft = "【";
    const decoRight = "】";

    $(".decoration").each((index, element) => {
        element.innerHTML = decoLeft + element.innerHTML + decoRight;
    });
};

const editLastUpdate = () => {
    $("#lastUpdate").text(metaDataJSON.lastUpdate);
}

const editMyName = () => {
    $("#myName").text(profileJSON.myName);
}

const editMyAddress = () => {
    $("#myAddress").text(profileJSON.myAddress);
}

const editPrintPageLink = () => {
    $("#printPageLinkText").text(metaDataJSON.toPrintText);
    $("#printPageLink").prop("href", metaDataJSON.toPrintHref);
}

const editPortfolio = () => {
    $("#appURLCaption").text(portfolioJSON.appURLCaption);
    $("#appURLText").text(portfolioJSON.appURL);
    $("#appURL").prop("href", portfolioJSON.appURL);

    $("#portfolioComment1").text("　" + portfolioJSON.comment1);
    $("#portfolioComment2").text("　" + portfolioJSON.comment2);
    $("#portfolioComment3").text("　" + portfolioJSON.comment3);
    $("#portfolioComment4").text(portfolioJSON.comment4);

    $("#sourceURLCaption").text(portfolioJSON.sourceURLCaption);
    $("#sourceURLText").text(portfolioJSON.sourceURL);
    $("#sourceURL").prop("href", portfolioJSON.sourceURL);
}

const editJobCareer = () => {
    // 日付文字列 降順ソート (key: 期間の最終年月, 例: 2024/08 < 2024/10)
    const historiesJson = [...historiesJSON].sort(
        (a, b) => b.period.substring(b.period.length - PELIOD_STR_LENGTH).localeCompare(a.period.substring(a.period.length - PELIOD_STR_LENGTH))
    );

    // DOM構築
    let historyNo = 1;
    for (const history of historiesJson) {
        // 業務内容詳細の構築
        let jobContentDetails = "";
        const jobDetails = [...history.jobContents];
        jobDetails.forEach(detail => jobContentDetails += `<p>${detail}</p>`);

        // 経歴を構築
        $("#historiesFrame").append(
            `<div class="history">` +
                // 経歴タイトルを構築
                `<h1 class="historyTitle">
                    ${HALF_SPACE}#${HALF_SPACE}${historyNo}${WHOLE_SPACE}${history.historyTitle}
                 </h1>` +
                `<div class="historyDetail">` +
                    `<p><span class="detailTitle">期間：</span>${history.period}</p>` + // 期間
                    `<p><span class="detailTitle">業種：</span>${history.industry}</p>` + // 業種
                    `<p><span class="detailTitle">規模：</span>${history.scale}</p>` + // 規模
                    `<p><span class="detailTitle">使用言語等：</span>${history.programmingLanguages}</p>` + // 使用言語等
                    `<div class="jobContent">` +
                        `<p class="jobContentTitle"><span class="detailTitle">業務内容</span></p>` +
                        `<div>` +
                            jobContentDetails + // 業務内容詳細
                        `</div>` +
                    `</div>` +
                `</div>` +
            `</div>`
        );
        historyNo++;
    }
}

const editSkills = () => {
    const skills = [...skillsJSON];
    skills.forEach(skill => $("#skills").append(`<p>${skill}</p>`));
}

const editLittleSkills = () => {
    const littleSkills = [...littleSkillsJSON];
    littleSkills.forEach(skill => $("#littleSkills").append(`<p>${skill}</p>`));
}

const editUseTools = () => {
    const useTools = [...useToolsJSON];
    useTools.forEach(tool => $("#useTools").append(`<p>${tool}</p>`));
}

const editReadBooks = () => {
    const readBooks = [...readBooksJSON];
    readBooks.forEach(book => $("#modalWindow > .contents").append(`<p>📖${book}</p>`));
    $("#modalWindow > .contents").append("<br/>");
    $("#modalWindow > .contents").append("※その他５０冊以上");
}

const editPr = () => {
    $("#prPoint1").text(prJSON.point1);
    $("#prComment1").text(prJSON.comment1);
    $("#prPoint2").text(prJSON.point2);
    $("#prComment2").text(prJSON.comment2);
    $("#prPoint3").text(prJSON.point3);
    $("#prComment3").text(prJSON.comment3);
    $("#prPoint4").text(prJSON.point4);
    $("#prComment4").text(prJSON.comment4);
}

/***********************************************************
 * jsons
 *
 * jobCareer: 職務経歴
 * readBooks: 読んできた本
 ************************************************************/

/**
 * 職務経歴データ
 *
 * template
{
    "historyTitle": "...",
    "period": "xxxx.xx ~ xxxx.xx",
    "industry": "...",
    "scale": "...",
    "programmingLanguages": "...",
    "jobContents": [
        内容１，
        内容２，
        ...
    ]
}
 */
const historiesJSON = [
    {
        "historyTitle": "情報系アプリ（新規機能開発）",
        "period": "2025.01 ~ 2025.03",
        "industry": "金融",
        "scale": "15 ~ 20名",
        "programmingLanguages": "html, css, javaScript, jQuery, java, springBoot, postgreSQL",
        "jobContents": [
            "・詳細設計～単体テスト",
            "・2022.01 ~ 2022.08 , 2023.01 ~ 2024.03 の期間と同じ現場で3度目の現場入り。",
            "・新規機能の開発を担当。",
            "・要件等が複雑であったため、リファクタリングしながら丁寧にコーディング。",
            "・製造範囲：WebUI、サーバ処理、SQL"
        ]
    },
    {
        "historyTitle": "情報系アプリ（新規機能開発、機能改修、保守運用）",
        "period": "2022.01 ~ 2022.08 , 2023.01 ~ 2024.03",
        "industry": "金融",
        "scale": "15 ~ 20名",
        "programmingLanguages": "html, css, javaScript, jQuery, java, springBoot, postgreSQL",
        "jobContents": [
            "・基本設計～結合テスト、保守運用、調査、ルーティンの自動化（VBA）、新人の方のコーディング指導",
            "・新規機能の製造は4画面、3帳票、バッチ5本を担当。",
            "・保守運用：アプリの障害対応、既存不良の解消、顧客依頼の修正作業等。",
            "・製造範囲：WebUI、サーバ・バッチ処理、SQL"
        ]
    },
    {
        "historyTitle": "情報系システム（総合テスト～）",
        "period": "2024.06 ~ 2024.12",
        "industry": "住宅関連サービス",
        "scale": "30人",
        "programmingLanguages": "C#, ASP.NET, cshtml, javaScript, SQL Server",
        "jobContents": [
            "総合テスト、障害調査、障害対応",
            "・障害発見件数：16件",
            "・障害対応件数：85件以上 ※コーディング、単体テスト"
        ]
    },
    {
        "historyTitle": "帳票出力システム（新規開発）",
        "period": "2024.04 ~ 2024.05",
        "industry": "公共",
        "scale": "2名",
        "programmingLanguages": "C#, ASP.NET, ActiveReport, SQL Server",
        "jobContents": [
            "・詳細設計、コーディング、単体テスト",
            "・5つの帳票出力機能を担当。",
            "・製造範囲：帳票定義ライブラリ、サーバ処理、SQL"
        ]
    },
    {
        "historyTitle": "経理システム（リプレイス）",
        "period": "2022.11 ~ 2022.12",
        "industry": "電力",
        "scale": "30名",
        "programmingLanguages": "java, springBoot, abap（SAP）",
        "jobContents": [
            "・詳細設計、コーディング",
            "・リプレイス：abap言語（SAP）の仕様を調べながらjavaへ翻訳。",
            "・コーディング：2機能担当（10,000 Step）。"
        ]
    },
    {
        "historyTitle": "情報システム（リプレイス）",
        "period": "2022.09 ~ 2022.10",
        "industry": "公共",
        "scale": "10名",
        "programmingLanguages": "html, css, java, springBoot, struts, mySQL, VBA, PowerShell",
        "jobContents": [
            "・調査、ツール製造、結合テスト",
            "・ツール製造：VBA, powerShell を使用し、顧客の業務効率を改善した。",
            "・リプレイス：フレームワークの置き換え（struts to spring）。",
            "・調査：フレームを置き換えた影響により障害が発生しており、原因を調査。"
        ]
    },
    {
        "historyTitle": "WEBアプリ & 顧客所有アプリ（新規立ち上げ、既存アプリの改修・障害対応）",
        "period": "2021.06 ~ 2021.12",
        "industry": "製造",
        "scale": "1名",
        "programmingLanguages": "html, css, javaScript, C#, VB.net, ASP.net Core, postgreSQL",
        "jobContents": [
            "・要求分析～結合テスト、保守",
            "・VB.NETで作成された既存アプリに対し、機能の追加や改修を行った。",
            "・WEBアプリ（案件管理用）を新規に作成。WebUI、サーバ処理、DB処理、サーバの構築などを行った。",
            " ※初現場。顧客側はIT技術者0人 + 単独での常駐であるためプロとしての経験とは言えない。"
        ]
    },
    {
        "historyTitle": "職業訓練（Webアプリ制作）",
        "period": "2020.12 ~ 2021.04",
        "industry": "―",
        "scale": "チーム：4名、クラス：15名",
        "programmingLanguages": "java, postgreSQL, HTML, Servlet, JSP",
        "jobContents": [
            "独学でプログラムに触れた後、基礎固めのため入校。",
            "java, postgreSQL, HTML, Servlet, JSP の基本を学習。",
            "最終課題のチームによるアプリ制作では、詳細設計～実装を担当した。",
            "実装についてはほぼ1人で担う。",
            "帰宅後、休日もひたすらコーディングに打ち込んでいた。"
        ]
    },
    {
        "historyTitle": "IT以外の主な経歴",
        "period": "2017.05 ~ 2020.09",
        "industry": "税理士業、経理",
        "scale": "7～40名",
        "programmingLanguages": "VBA",
        "jobContents": [
            "税務会計、決算・申告、監査、経理作業、巡回訪問",
            "VBAを使用した業務効率化（業後、休暇を利用し在職中に習得）"
        ]
    }
];

/**
 * メタデータ
 */
const metaDataJSON = {
    "lastUpdate": "2025/03/02",
    "toPrintText": "プリント用レイアウト表示",
    "toPrintHref": "./CatalogPrint.html",
}

/**
 * 基本情報
 */
const profileJSON = {
    "myName": "尾畑　一貴",
    "myAddress": "福岡県福岡市在住"
}

/**
 * スキルデータ
 */
const skillsJSON = [
    "HTML",
    "CSS",
    "JavaScript (jQuery)",
    "TypeScript",
    "React",
    "C# (ASP.NET Core)",
    "Java (Spring Boot)",
    "PostgreSQL",
    "SQL Server",
    "VBA",
    "リファクタリング",
    "リーダブルコーディング",
    "レイヤードアーキテクチャ",
];

/**
 * スキルデータ(習熟度低め・練習中・関心事)
 */
const littleSkillsJSON = [
    "クリーンアーキテチャ",
    "Domain Driven Development",
    "Test Driven Development",
    "基本設計",
    "テーブル設計",
    "SQLチューニング",
    "正規表現",
    "Linux(ubunts)"
];

/**
 * 使用ツール
 */
const useToolsJSON = [
    "Windows",
    "WinMerge",
    "サクラエディタ",
    "Eclipse",
    "Visual Studio",
    "Visual Studio Code",
    "A5",
    "DBeaver",
    "WinSCP",
    "Putty"
];

/**
 * 読んだ本
 */
const readBooksJSON = [
    "SQLパズル",
    "達人に学ぶSQL徹底指南書",
    "SQLアンチパターン",
    "システム開発・刷新のためのデータモデル大全",
    "Head First デザインパターン",
    "リーダブルコード",
    "達人プログラマー",
    "ルールズ・オブ・プログラミング",
    "プリンシプル オブ プログラミング",
    "実務で役立つシステム設計の原則",
    "good code, bad code",
    "問題解決のための「アルゴリズム × 数学」がしっかり身につく本",
    "リファクタリング",
    "実践ドメイン駆動設計",
    "クリーンアーキテクチャ",
    "ソフトウェア開発現場の「失敗」集めてみた",
    "React開発入門",
    "React 実践の教科書"
];

/**
 * ポートフォリオ
 */
const portfolioJSON = {
    "appURLCaption": "成果物",
    "appURL": "https://kazapp-trial.com",
    "sourceURLCaption": "ソース（React, TypeScript, C#/ASP.NET CORE, PostgreSQL, Linux:Ubuntu）",
    "sourceURL": "https://github.com/kazGear/kaz_app.git",
    "comment1": "ゲームが主体のプログラムです。某RPGのカジノの某ゲームと、昔流行ったえんぴつを転がすゲームを足したようなものです。",
    "comment2": "他にはゲームに関連する事項として、ログイン認証や、お買い物（疑似）、各種設定などありきたりなものを実装（未完成部分大量にあり）してみました。",
    "comment3": "SSL証明書を入れておりますので、お気軽に触れてみてください。",
    "comment4": "（chrome, edge推奨。スマホ非対応。）"
}

/**
 * PR事項
 */
const prJSON = {
    "point1": "本番障害なし",
    "comment1": "自身で書いたコードは、リリース後に障害が発生していません。安全なコードを書こうと心がけています。",
    "point2": "プログラムの品質を意識できる",
    "comment2": "書ければ良し、動けば良しとは思わず、可読性・保守性・拡張可能性も考慮します。",
    "point3": "学習意欲が非常に高い",
    "comment3": "読書やWebでの調べもの、コーディングを日々実践しています。\n通勤や昼休みなどの空き時間でも何かしら勉強していることが多いです。",
    "point4": "好んでこの仕事をしている",
    "comment4": "よって日々成長します。あれこれ考えるのは楽しいことです。",
}