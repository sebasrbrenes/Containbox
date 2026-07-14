# FileFollowup — 30-Day English-Market Validation Plan

## Decision

Use **FileFollowup** as the product name.

**Tagline:** Stop chasing client documents.

**One-sentence positioning:** FileFollowup helps small bookkeeping and accounting firms request, collect, and track client documents through a simple checklist and a secure upload link that requires no client account.

The selected domain is **filefollowup.com**. It was not registered when checked on July 14, 2026, but domain availability can change until registration is complete. Register it before public launch, then perform proper company-name, social-handle, and trademark checks in the intended jurisdictions.

## Why this name

- It describes the job the customer is trying to eliminate: repeatedly following up for files.
- It is understandable without explaining accounting terminology.
- It supports the core sales promise rather than describing a generic inbox.
- It can later serve bookkeepers, tax preparers, payroll firms, mortgage brokers, and other document-heavy services.

Names excluded during preliminary screening include DocNudge, CloseDocs, CloseInbox, Chaseless, and LedgerInbox because active products or closely related uses already exist. This was only an obvious-conflict search, not legal clearance.

## 1. Validation objective

Prove within 30 days that small English-speaking bookkeeping firms will:

1. Pay for a configured document-collection pilot.
2. Send FileFollowup links to real clients.
3. Receive real documents through those links.
4. Report a meaningful reduction in manual follow-up.
5. Continue paying for another month.

The objective is **not** to maximize signups, compliments, waitlist entries, or features. The objective is to complete this loop:

```text
Qualified prospect -> paid pilot -> first request -> client upload
-> completed monthly workflow -> renewal
```

## 2. Initial market

Focus only on the **United States** during this experiment. “English-speaking market” is too broad for a useful 30-day test.

### Ideal customer profile

- US-based independent bookkeeper or bookkeeping firm
- One to five team members
- 20–150 recurring business clients
- Performs monthly bookkeeping or month-end close work
- Currently requests statements, receipts, invoices, payroll records, or reports through email, text, spreadsheets, or shared drives
- Personally spends time checking what is missing and sending reminders
- Does not have a client portal that its clients consistently use
- Owner or practice manager can make a purchasing decision

### Exclude initially

- Large CPA firms with procurement or IT approval processes
- Firms seeking a complete practice-management replacement
- Firms requiring deep QuickBooks, Xero, tax-software, or document-management integrations before a pilot
- Firms with fewer than 15 recurring clients
- Firms already satisfied with an adopted portal and automated request workflow
- Prospects that cannot test the product during an actual client-document cycle in the next 30 days

## 3. Problem hypothesis

Small bookkeeping firms lose several hours each month because client documents arrive late and through disconnected channels. The staff must remember what is missing, send repeated reminders, locate attachments, and reorganize files by client and period.

The riskiest assumptions are:

1. The problem happens frequently enough to justify another paid tool.
2. Existing email, shared drives, QuickBooks, and practice-management tools do not solve it well enough.
3. Clients will use a no-login upload link.
4. Firms will trust a new provider with client documents.
5. Done-for-you setup makes a paid pilot easier to buy.
6. The workflow saves enough time to support a $79–149 monthly price.

## 4. Offer to validate

Do not initially sell a self-serve SaaS subscription. Sell a configured outcome.

### 30-day paid pilot

**Price:** $149 paid before onboarding

**Includes:**

- One firm workspace
- Up to 10 real clients
- Done-for-you setup
- One custom monthly document checklist
- Secure no-login upload links
- Request-status tracking
- Reminder assistance
- ZIP download of collected files
- One onboarding call
- One end-of-pilot results call

**Guarantee:** If the firm completes onboarding and sends at least five requests but the workflow cannot be used because of a product failure that FileFollowup cannot correct, refund the pilot fee.

Do not guarantee time savings, client compliance, security certifications, or business results.

### Post-pilot pricing hypothesis

- **Solo:** $79/month, one user, up to 25 active clients
- **Firm:** $149/month, up to five users and 100 active clients
- Continue offering paid setup until onboarding becomes genuinely self-service.

Pricing is an experiment. Record objections and willingness to pay instead of discounting automatically.

## 5. Product scope and feature freeze

### Required for the pilot

- Firm login
- Client creation
- Document-request checklist by client and period
- Secure public upload link with no client account
- Pending, received, and reviewed states
- Individual document download
- ZIP download by request
- Reminder workflow
- Mobile-friendly client upload page
- Clear success confirmation after upload
- Basic deletion and retention process

### Explicitly excluded until paid usage proves a need

- OCR or AI document extraction
- Native mobile applications
- Bookkeeping or tax preparation
- QuickBooks or Xero integration
- E-signatures
- Full CRM or practice management
- White-label mobile applications
- Complex workflow builders
- Multiple pricing pages or self-serve billing architecture

During the 30 days, fix security, reliability, and onboarding blockers. Do not add requested features unless the absence prevents a paid pilot from completing the core workflow.

## 6. Trust requirements before real documents

Before onboarding a firm, verify and document:

- Production Supabase project and private storage bucket
- Row-level-security policies for firm-owned records
- Unpredictable, revocable upload tokens
- Authorization checks on every document and ZIP download
- Server-side file type and file size validation
- HTTPS in production
- No service-role or provider secrets exposed to the browser
- No real client documents in Git, logs, screenshots, demos, or AI tools
- A documented retention and deletion process
- Working privacy policy, terms, and support contact
- Clear statement of where data is stored and which providers process it
- Backup and incident-response basics

Do not claim SOC 2, HIPAA, bank-grade security, encryption guarantees, or regulatory compliance unless those statements have been verified.

## 7. Success thresholds

### Minimum commercial activity

- 100 qualified prospects contacted
- At least 10 discovery calls or demos
- At least three explicit paid-pilot asks
- At least two paid pilots

### Minimum product usage

- Two firms complete onboarding
- At least 10 real client requests are sent
- At least 30 real documents are uploaded
- At least five requests reach completed or materially complete status
- Median time from firm onboarding to first request is under 24 hours
- At least one external client uploads within 72 hours of receiving a link

### Minimum business validation

- At least one firm reports saving two or more hours during the pilot, or identifies another measurable operational benefit
- At least one firm agrees to renew at $79/month or more
- No unresolved security or reliability issue prevents continued use

Payment without usage is weak evidence. Usage without payment is also weak evidence. Renewal after real use is the primary signal.

## 8. 30-day execution schedule

### Days 1–3 — Production readiness

1. Deploy the current application to production.
2. Run the complete workflow with synthetic documents:
   - create firm account,
   - create client,
   - create request,
   - open public link on a phone,
   - upload every supported file type,
   - review and download,
   - download ZIP,
   - send reminder,
   - close request,
   - delete test records and files.
3. Complete the trust checklist in Section 6.
4. Create a clean demo workspace using fictional data.
5. Add one primary CTA: **Book a 15-minute demo**.
6. Prepare a manual payment method or payment link. Billing automation is not required.
7. Record a 60–90 second English walkthrough.

**Exit condition:** A prospect can see the product, pay, and be onboarded without a developer changing the database manually.

### Days 4–7 — Prospect list and message testing

1. Build a list of 100 US bookkeeping prospects.
2. Prioritize firms with an owner visible on LinkedIn and a clear monthly-bookkeeping offer.
3. Divide prospects into two segments:
   - independent bookkeepers,
   - small bookkeeping firms with two to five staff.
4. Send 15–20 personalized messages per day.
5. Test two opening angles:
   - time lost chasing missing documents,
   - friction caused by making clients use complex portals.
6. Record every contact and follow-up in `PROSPECT_TRACKER.csv`.

**Exit condition:** At least three qualified conversations are scheduled. Do not change the product because of low reply rates until the audience, deliverability, and message have been reviewed.

### Days 8–14 — Discovery and paid-pilot sales

1. Conduct at least five calls.
2. Spend the first half of each call understanding the existing workflow.
3. Demonstrate only the core request-to-upload flow.
4. Ask qualified prospects to start the $149 pilot during the call.
5. Onboard paying customers within 24 hours.
6. Ask non-buyers what evidence, capability, price, or trust condition prevented purchase.

**Exit condition:** At least one paid pilot and five completed discovery calls.

### Days 15–21 — Real usage

1. Configure each paid workspace personally.
2. Help the firm send its first five client requests.
3. Observe the client upload experience without coaching the client when possible.
4. Record confusion, abandoned uploads, missing file types, and support requests.
5. Fix only workflow-blocking defects.
6. Capture baseline information:
   - time previously spent following up,
   - number of messages normally sent,
   - document channels previously used,
   - average delay before receiving documents.

**Exit condition:** Two firms have sent real requests, or all qualified pilots have produced a documented reason for failure.

### Days 22–26 — Results and conversion

Prepare a one-page pilot result for each firm:

- Clients invited
- Clients who opened or used the link, if measurable
- Requests completed
- Documents received
- Items still missing
- Reminders sent
- Reported time saved
- Problems encountered

Hold a results call and ask directly for the next month at the proposed plan price.

**Exit condition:** At least one renewal decision is recorded as yes or no with the exact reason.

### Days 27–30 — Proof-led selling and decision

1. Ask successful users for a short testimonial and two referrals.
2. Turn verified results into an anonymized case study.
3. Recontact qualified non-buyers with the result, not a feature announcement.
4. Review response, demo, payment, activation, usage, and renewal metrics.
5. Make the continue, revise, or stop decision using Section 13.

## 9. Daily sales cadence

On weekdays during active prospecting:

- 15 new personalized contacts
- 10 follow-ups
- Two short Loom/video audits or voice notes for high-value prospects
- One discovery call or demo target
- One direct paid-pilot ask whenever the prospect qualifies
- End-of-day tracker update

Spend at least 70% of available work time on prospecting, calls, onboarding, and customer observation. Cap unplanned development at 30%.

## 10. Discovery questions

1. Walk me through how you request monthly documents today.
2. How many clients send documents every month?
3. Which documents are most frequently late or missing?
4. Where do documents arrive: email, text, shared drive, portal, or somewhere else?
5. How do you know exactly what is still missing for each client?
6. How many follow-ups do you normally send?
7. Approximately how much staff time does this consume each month?
8. What have you already tried?
9. Do your clients successfully use your current portal? Why or why not?
10. What security or compliance requirements must a new tool satisfy?
11. Is there a real client cycle in the next 30 days where we could test this?
12. If we configure it for you and it works with 10 clients, would you pay $149 for the pilot today?

Avoid asking only hypothetical questions such as “Would you use this?” Ask for past behavior, current workflow, actual documents, a scheduled pilot, and payment.

## 11. Outreach templates

### Cold email

**Subject:** A simpler way to collect monthly client documents

Hi [First name],

I am testing FileFollowup with small bookkeeping firms that still spend time chasing statements and receipts through email or text.

You create a checklist, send one secure link, and the client uploads each missing document without creating an account. Your team can immediately see what is pending, received, or reviewed.

I am personally configuring three 30-day pilots for firms with recurring monthly clients. Would a 15-minute walkthrough be useful?

Sebastian

### LinkedIn message

Hi [First name] — quick question: does your team still manually track missing client statements or receipts through email and spreadsheets?

I am testing FileFollowup, a no-login document checklist for small bookkeeping firms. I am looking for three firms with a real monthly client cycle to run a configured paid pilot. Open to a short demo?

### First follow-up

Hi [First name], following up in case client-document chasing is currently taking time in your firm. The client does not create an account: they open one link, see the checklist, and upload what is missing. Is this worth a 15-minute look?

### Final follow-up

Last note from me. If your current portal or shared-drive workflow already gets documents on time, FileFollowup is probably unnecessary. If your team still sends repeated reminders, I would be glad to show the pilot workflow. Either answer is useful.

## 12. Five-minute demo

1. Restate the prospect's pain in their language.
2. Create or open a fictional client.
3. Show a monthly checklist with pending items.
4. Copy the no-login upload link.
5. Open it in a private/mobile browser and upload one file.
6. Return to the firm view and show the updated status.
7. Show reminder and ZIP download.
8. Present the $149 configured pilot.
9. Ask: **Should we configure this for 10 of your clients this month?**

Do not demo authentication internals, analytics providers, database structure, future AI, or features the prospect did not ask about.

## 13. Day-30 decision rules

### Continue

Continue investing in FileFollowup when:

- At least two firms paid,
- real external clients uploaded documents,
- at least one firm renewed or committed to renew at $79/month or more,
- and the core workflow operated without unsustainable manual support.

Next target: 10 paying firms and $1,000+ MRR before adding major integrations.

### Revise the offer or customer segment

Revise positioning, onboarding, pricing, or the target segment when:

- Qualified prospects consistently acknowledge the pain but do not pay,
- firms pay but fail to activate,
- or the product is used but the measured value is too small for the proposed price.

Run one focused revision at a time. Do not respond by building several features.

### Stop or pause

Pause FileFollowup when all of the following are true:

- At least 100 qualified prospects were contacted,
- at least 10 proper discovery calls or demos occurred,
- the paid pilot was directly offered,
- and no firm paid or committed to a time-bound paid start.

At that point, preserve the code and evidence, document the reasons, and move the primary validation effort to another business rather than extending the build indefinitely.

## 14. Weekly scorecard

| Metric | Week 1 | Week 2 | Week 3 | Week 4 |
|---|---:|---:|---:|---:|
| Qualified prospects added |  |  |  |  |
| New contacts sent |  |  |  |  |
| Positive replies |  |  |  |  |
| Discovery calls |  |  |  |  |
| Demos |  |  |  |  |
| Paid-pilot asks |  |  |  |  |
| Paid pilots |  |  |  |  |
| Firms activated |  |  |  |  |
| Client requests sent |  |  |  |  |
| Documents uploaded |  |  |  |  |
| Completed requests |  |  |  |  |
| Refunds |  |  |  |  |
| Renewals |  |  |  |  |
| Cash collected |  |  |  |  |

## 15. Evidence log

After every call or meaningful customer interaction, record:

- Prospect segment and size
- Current workflow
- Frequency and severity of the problem
- Existing tools
- Exact language used to describe the pain
- Security requirements
- Price reaction
- Paid-pilot decision
- Reason for yes or no
- Requested feature and whether it blocks the core workflow
- Next action and date

The final decision should be based on this evidence log and the scorecard, not on how complete the application feels.
