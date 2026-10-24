/* =============================================================================
   VICTUS CLOUD – STAFF RULES · EDITABLE CONTENT
   Everything you need to change (rules, roles, punishments, changelog,
   version, password, official links) lives in this one object.
   ============================================================================= */
var STAFF_RULES_DATA = {
  meta: {
    title: "Victus Cloud – Staff Rules",
    version: "v1.0",
    lastUpdated: "24 Oct 2026",
    password: "TestBictus",
    logoPath: "assets/logo.png",
    copyright: "© 2026 Victus Cloud. All rights reserved.",
    location: "Dubai, United Arab Emirates",
    footerLinks: [
      { label: "Official Site (victuscloud.com)", url: "https://victuscloud.com" },
      { label: "Victus Panel", url: "https://control.victuscloud.com" },
      { label: "Support Centre", url: "https://support.victuscloud.com/" },
      { label: "Documentation", url: "https://victuscloud.com/documentation" },
      { label: "Service Status", url: "https://victuscloud.com/status" },
      { label: "Discord", url: "https://discord.gg/wwHpnzYpXb" },
      { label: "Privacy Policy", url: "https://victuscloud.com/privacy" },
      { label: "Terms of Service", url: "https://victuscloud.com/tos" }
    ]
  },
  agreement: {
    title: "STAFF AGREEMENT",
    text: "By becoming a staff member, you agree to follow these rules and understand that staff permissions are a responsibility, not a privilege to be abused. Breaking staff rules may result in a warning, demotion, suspension, or removal from the Staff Team."
  },
  roles: [
    "All", "Founder / CEO", "Co-Founder / CTO", "Director of Operations", "Staff Manager",
    "General Manager", "Core Team", "System Manager", "Project Manager", "Community Manager",
    "Support Manager", "Email Manager", "Developer", "Moderator", "Customer Support",
    "Technical Support", "Trial Dev", "Trial Staff", "Staff"
  ],
  sections: [
    { number: 1, title: "Professional Behavior", rules: [
      { id: "1.1", text: "Maintain professional behavior in every case.", roles: ["All"] },
      { id: "1.2", text: "Be user-friendly. Help members in the language they're comfortable with, as quickly as possible.", roles: ["All"] },
      { id: "1.3", text: "Don't joke around in tickets or anywhere seriousness is needed.", roles: ["All"] }
    ] },
    { number: 2, title: "Staff Conduct", rules: [
      { id: "2.1", text: "Follow the rules yourself and make sure your crewmates follow them too.", roles: ["All"] },
      { id: "2.2", text: "Don't abuse your power or show it off.", roles: ["All"] },
      { id: "2.3", text: "Don't use commands or permissions for personal benefit.", roles: ["All"] },
      { id: "2.4", text: "Don't punish members because of personal aggression in chats, DMs, etc.", roles: ["All"] },
      { id: "2.5", text: "Don't misuse moderation bots or server features.", roles: ["All"] }
    ] },
    { number: 3, title: "Moderation", rules: [
      { id: "3.1", text: "Always investigate a case before punishing.", roles: ["All"] },
      { id: "3.2", text: "Keep punishments fair for everyone.", roles: ["All"] },
      { id: "3.3", text: "Use warnings for inappropriate behavior. Staff Manager can warn staff. Staff, General Manager, and higher roles can warn members. Higher officials can warn everyone below them. Founder / CEO can only be warned by a Founder / CEO.", roles: ["Founder / CEO", "Co-Founder / CTO", "Director of Operations", "Staff Manager", "General Manager", "Moderator", "Staff"] },
      { id: "3.4", text: "Every punishment needs a proper, valid reason.", roles: ["All"] },
      { id: "3.5", text: "Don't ban or kick unless it's an emergency or you have permission from higher officials.", roles: ["All"] },
      { id: "3.6", text: "If you make a mistake, inform higher staff immediately so it can be fixed.", roles: ["All"] }
    ] },
    { number: 4, title: "Evidence and Logs", rules: [
      { id: "4.1", text: "Keep proper proof for every moderation action, especially payment cases, until the Founder verifies it.", roles: ["All"] },
      { id: "4.2", text: "Don't accept server screenshots as proof, since they can't be verified as real.", roles: ["All"] },
      { id: "4.3", text: "Use the proper moderation channel for commands.", roles: ["All"] },
      { id: "4.4", text: "Report suspicious activity to higher officials.", roles: ["All"] }
    ] },
    { number: 5, title: "Staff Confidentiality", rules: [
      { id: "5.1", text: "Don't leak private staff discussions or hosting details to other hosts or users.", roles: ["All"] },
      { id: "5.2", text: "Keep upcoming features hidden from users. Don't leak them.", roles: ["All"] },
      { id: "5.3", text: "Don't share private ticket information with any user.", roles: ["All"] },
      { id: "5.4", text: "Don't share any member's or staff's private life information in tickets or public chats.", roles: ["All"] }
    ] },
    { number: 6, title: "Ticket and Member Support", rules: [
      { id: "6.1", text: "Respond to tickets politely, calmly, and kindly. Every customer is valued.", roles: ["All"] },
      { id: "6.2", text: "Don't ignore members who need help. Ping higher staff once (or the Founder once), and keep the member calm until support arrives.", roles: ["All"] },
      { id: "6.3", text: "Escalate complicated issues to higher officials if you can't handle them properly.", roles: ["All"] }
    ] },
    { number: 7, title: "Fairness and Abuse of Power", rules: [
      { id: "7.1", text: "Never give friends special treatment, including in partnerships.", roles: ["All"] },
      { id: "7.2", text: "Don't threaten members with your rank.", roles: ["All"] },
      { id: "7.3", text: "Don't use staff permissions (muting, banning, etc.) to win an argument.", roles: ["All"] },
      { id: "7.4", text: "Don't punish someone just because they personally criticized you.", roles: ["All"] },
      { id: "7.5", text: "Base decisions on the server rules, not personal opinions.", roles: ["All"] }
    ] },
    { number: 8, title: "Activity and Inactivity", rules: [
      { id: "8.1", text: "Stay reasonably active: minimum 3-4 hours a day.", roles: ["All"] },
      { id: "8.2", text: "If you'll be inactive for a long period, inform the staff team in the appropriate channel. If you need to extend it, inform them again with a valid reason.", roles: ["All"] },
      { id: "8.3", text: "Repeated unexplained inactivity may lead to demotion or removal from staff.", roles: ["All"] },
      { id: "8.4", text: "Quality of moderation matters more than just being online. Keeping chats and VCs active counts more than \"I was online all day.\"", roles: ["All"] }
    ] },
    { number: 9, title: "Staff Communication", rules: [
      { id: "9.1", text: "Keep staff decisions organized and respectful.", roles: ["All"] },
      { id: "9.2", text: "Follow legitimate decisions from higher-ranking staff without questioning them unless asked, except to report misconduct or rule violations.", roles: ["All"] },
      { id: "9.3", text: "Handle disagreements privately, within the group, and respectfully.", roles: ["All"] },
      { id: "9.4", text: "Don't create unnecessary staff drama.", roles: ["All"] }
    ] },
    { number: 10, title: "Promotion and Demotion", rules: [
      { id: "10.1", text: "Promotions are based on activity, maturity, reliability, and quality of work. Asking for a promotion won't help and may lead to immediate demotion.", roles: ["All"] },
      { id: "10.2", text: "Staff can be demoted for inactivity, misconduct, or permission abuse, only by the Staff Manager or higher officials, and only with a valid reason.", roles: ["Founder / CEO", "Co-Founder / CTO", "Director of Operations", "Staff Manager"] },
      { id: "10.3", text: "Serious violations may result in immediate removal from the staff team.", roles: ["All"] }
    ] },
    { number: 11, title: "No Favouritism", rules: [
      { id: "11.1", text: "Treat everyone fairly, respectfully, and kindly: friends, donors, boosters, creators, and regular members alike.", roles: ["All"] },
      { id: "11.2", text: "Rules apply equally to everyone unless an official exception exists (for example, the Founder).", roles: ["All"] }
    ] },
    { number: 12, title: "Founder, CEO and CTO", rules: [
      { id: "12.1", text: "Founder / CEO and Co-Founder / CTO are whitelisted and can do anything, but are still expected to act with seriousness.", roles: ["Founder / CEO", "Co-Founder / CTO"] },
      { id: "12.2", text: "All other roles must follow these rules.", roles: ["Director of Operations", "Staff Manager", "General Manager", "Core Team", "System Manager", "Project Manager", "Community Manager", "Support Manager", "Email Manager", "Developer", "Moderator", "Customer Support", "Technical Support", "Trial Dev", "Trial Staff", "Staff"] }
    ] },
    { number: 13, title: "Ticket-Handling System", rules: [
      { id: "13.1", text: "One-hour rule: If a staff member can't answer within 60 minutes, any other staff may take over. While the new staff member is active, the original one stays silent until the new one is also inactive for 1 hour.", roles: ["All"] },
      { id: "13.2", text: "\"I need backup\" signal: If you don't know the fix, type \"@staff anyone else can handle this?\". The first staff member to respond becomes the new owner. If the original staff member replies first, they keep the ticket. If this happens 3 times on the same ticket, they lose it.", roles: ["All"] },
      { id: "13.3", text: "Chain of custody: Only one staff member speaks at a time. Ownership transfers automatically after 1 hour of inactivity or via the @staff ping.", roles: ["All"] },
      { id: "13.4", text: "Customer clarity: Users should see one clear voice, with no cross-talk or duplicate answers. When ownership changes, the new staff member greets the customer and summarizes the issue so they aren't lost.", roles: ["All"] }
    ] },
    { number: 14, title: "Server Permissions and Anti-Nuke", rules: [
      { id: "14.1", text: "Only staff with the \"Antinuke Whitelist\" role may create or delete roles and channels, or make other major server changes (categories, permissions, webhooks, bots, etc.).", roles: ["All"] },
      { id: "14.2", text: "Without the role, don't attempt these actions. The anti-nuke system automatically bans anyone who deletes channels or roles without it.", roles: ["All"] },
      { id: "14.3", text: "If you need a role or channel created or deleted, ask a whitelisted staff member or a higher official.", roles: ["All"] },
      { id: "14.4", text: "Our bot automatically catches some cuss words and threats, but not all. Don't rely on it. Staff must still watch chats and act on violations.", roles: ["All"] },
      { id: "14.5", text: "Don't try to bypass, disable, or test the anti-nuke or the bot's filters.", roles: ["All"] }
    ] },
    { number: 15, title: "Impersonation", rules: [
      { id: "15.1", text: "Don't pretend to be another staff member, a higher official, the Founder, or Victus Cloud.", roles: ["All"] },
      { id: "15.2", text: "Report anyone impersonating staff or Victus Cloud to higher officials, with proof.", roles: ["All"] },
      { id: "15.3", text: "Staff caught impersonating may be removed from the team.", roles: ["All"] }
    ] },
    { number: 16, title: "Final Rule", rules: [
      { id: "16.1", text: "Use common sense and treat everyone with kindness and seriousness, in line with your position and rank.", roles: ["All"] }
    ] }
  ],
  punishments: {
    title: "PUNISHMENT TABLES",
    members: {
      heading: "Members (kicks and bans still need higher-official permission, except in emergencies):",
      rows: [
        { offense: "Spam, off-topic, caps", severity: "Low", action: "Warn, then 1h mute" },
        { offense: "Disrespect, mild insults", severity: "Low", action: "Warn, then 24h mute" },
        { offense: "Ticket abuse, trolling", severity: "Medium", action: "Warn, then 24h mute" },
        { offense: "Unauthorized advertising", severity: "Medium", action: "Delete + warn, then 24h mute" },
        { offense: "Harassment, hate, threats", severity: "High", action: "7d mute or ban" },
        { offense: "Scam or malicious links", severity: "Critical", action: "Immediate ban" },
        { offense: "Fake payment proof", severity: "Critical", action: "Ban (Founder verifies)" },
        { offense: "Leaking private info", severity: "Critical", action: "Ban" },
        { offense: "Ban evasion, alt accounts", severity: "Critical", action: "Ban" }
      ]
    },
    staff: {
      heading: "Staff:",
      rows: [
        { offense: "Unprofessional tone, minor slip", severity: "Low", action: "Warning" },
        { offense: "Unexplained inactivity", severity: "Medium", action: "Warning, then demotion" },
        { offense: "Favouritism, threats, rank abuse", severity: "High", action: "Demotion" },
        { offense: "Permission or bot misuse", severity: "High", action: "Suspension or demotion" },
        { offense: "Impersonation", severity: "High", action: "Removal" },
        { offense: "Leaking confidential info", severity: "Critical", action: "Suspension or removal" },
        { offense: "Role/channel changes without the Antinuke Whitelist role", severity: "Critical", action: "Automatic ban by anti-nuke, then reviewed by Founder / CEO" },
        { offense: "Fraud", severity: "Critical", action: "Immediate removal" }
      ]
    }
  },
  changelog: [
    { version: "v1.0", date: "24 Oct 2026", summary: "Initial release of the staff rules, including the new ticket-handling system and anti-nuke rules." }
  ]
};
