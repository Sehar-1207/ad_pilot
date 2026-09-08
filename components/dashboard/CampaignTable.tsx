'use client';

interface Campaign {
  name: string;
  spend: string;
  clicks: string;
  ctr: string;
  roas: string;
  status: string;
}

interface CampaignsTableProps {
  campaigns: Campaign[];
  userPlan: 'free' | 'pro';
}

export function CampaignsTable({
  campaigns,
  userPlan
}: CampaignsTableProps) {
  return (
    <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)] shadow-sm overflow-hidden transition-colors duration-300">

      <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[var(--text-primary)]">
            Active Campaigns
          </h2>

          <p className="text-xs text-[var(--text-secondary)] font-medium">
            Synced from connected Meta Ads Manager
          </p>
        </div>

        <span className="text-xs font-bold text-[var(--text-secondary)]">
          {userPlan === 'free'
            ? 'Showing top 3 campaigns (Free)'
            : 'All Campaigns'}
        </span>
      </div>

      {campaigns.length === 0 ? (
        <div className="py-16 px-6 text-center">
          <p className="text-sm font-semibold text-[var(--text-secondary)]">
            No data found
          </p>

          <p className="mt-1 text-xs text-[var(--text-secondary)] opacity-70">
            No campaigns are available to display.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-accent)] text-[11px] font-black uppercase text-[var(--text-secondary)] tracking-wider border-b border-[var(--border-color)]">
                <th className="py-3.5 px-6">
                  Campaign Name
                </th>

                <th className="py-3.5 px-6">
                  Status
                </th>

                <th className="py-3.5 px-6">
                  Spend
                </th>

                <th className="py-3.5 px-6">
                  Clicks
                </th>

                <th className="py-3.5 px-6">
                  CTR
                </th>

                <th className="py-3.5 px-6">
                  ROAS
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)]">
              {campaigns.map((c, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[var(--bg-accent)] transition-colors"
                >
                  <td className="py-4 px-6 font-bold text-[var(--text-primary)]">
                    {c.name}
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        c.status === 'Active'
                          ? 'bg-[var(--accent-teal)]/15 text-[var(--accent-teal)] border border-[var(--accent-teal)]/30'
                          : 'bg-[var(--bg-accent)] text-[var(--text-secondary)] border border-[var(--border-color)]'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-[var(--text-primary)]">
                    {c.spend}
                  </td>

                  <td className="py-4 px-6 text-[var(--text-primary)]">
                    {c.clicks}
                  </td>

                  <td className="py-4 px-6 text-[var(--text-primary)]">
                    {c.ctr}
                  </td>

                  <td className="py-4 px-6 font-bold text-[var(--accent-teal)]">
                    {c.roas}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}