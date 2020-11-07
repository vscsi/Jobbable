const fetch = require('node-fetch');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

async function scrapePage(i) {
    const res = await fetch(`https://jobs.github.com/positions.json?page=${i}`);
    const json = await res.json();
    const rows = json.map(job => {
        return {
            github_id: job.id,
            status: false,
            title: job.title,
            company: job.company,
            location: job.location,
            created_at: job.created_at,
            url: job.url,
            job_type: job.type,
            description: job.description,
            company_logo: job.company_logo,
            how_to_apply: job.how_to_apply
        }
    });
    return rows;
}

(async function () {
    let i = 1;
    let rows = [];
    while (true) {
        const newRows = await scrapePage(i);
        if (newRows.length === 0) break;
        rows = rows.concat(newRows);
        i++;
    };
    console.log(rows.length)


    const csvWriter = createCsvWriter({
        path: 'githubjobs.csv',
        header: [
            {id: 'github_id', title: 'github_id'},
            {id: 'status', title: 'status'},
            {id: 'title', title: 'title'},
            {id: 'company', title: 'company'},
            {id: 'location', title: 'location'},
            {id: 'created_at', title: 'created_at'},
            {id: 'url', title: 'url'},
            {id: 'job_type', title: 'job_type'},
            {id: 'description', title: 'description'},
            {id: 'company_logo', title: 'company_logo'},
            {id: 'how_to_apply', title: 'how_to_apply'}
        ]
    });

    csvWriter.writeRecords(rows)

})();