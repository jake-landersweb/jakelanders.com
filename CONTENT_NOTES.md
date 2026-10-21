# Content notes

- Primary source: `website/pages/index.tsx`, including its uncommitted CloudZero, New Relic, Sapphire, and Workout Notepad updates. Six projects and four experience entries are retained; the removed Enterprise Emailer project is omitted.
- Bio, descriptions, and summaries were shortened. Project years are omitted because none are stated. Workout Notepad's technology is not stated, so its tech list is empty.
- CloudZero and Sapphire do not state formal job titles. Their role strings describe the work. The research entry names no employer; “Computational research workshops” is a descriptive label, not an inferred institution. WSU is mentioned in the Unix workshop post and represented by the old experience logo, but no degree or education dates were found. Education stays empty.
- Email comes from the contact form recipient (`website/components/form/form.tsx`), not its example placeholder or SMTP account. Location and social links come from the homepage. The Twitter URL belongs to the Crosscheck Sports account.
- Owner should confirm Portland location, email/social links, and all “Present” dates: CloudZero (December 2024), Sapphire (January 2022), research instruction (June 2020). These are source claims, not independently verified current employment. New Relic's latest source dates are May 2022–December 2024.
- `repo_scraper/lib/client.dart` and `routes.dart` hard-code `jake-landersweb/code_vault`, branch `main`. Each non-underscore top-level directory has `config.yaml`; the website fetches that directory's `README.md`. SQL contains schema only. Example YAML is not a real article config. Local July 2025 scraper logs corroborate all 13 recovered titles.
- Recovered all 13 articles from https://github.com/jake-landersweb/code_vault at commit 9fe69688e9872aead2ceb0cc346aa16efb9cc137. Markdown bodies are preserved as historical writing, including dated opinions, dependency/API examples, and source typos. Titles/tags come from configs; summaries are terse descriptions. Corrected “Dyanmic” to “Dynamic” in one title. The iOS-menu config calls the article a login screen, but its body describes a menu; the config title is retained.
- No article config supplies a date. Dates below use each README's earliest Git addition author date (following renames), not the old database's ingestion timestamps. Confirm actual publication dates before treating these as exact. Same-day articles are ordered by slug descending.
- Relative Markdown/reference/HTML asset links are resolved to absolute GitHub raw URLs. Existing absolute links and in-page anchors are preserved. Posts continue to load remote images from GitHub; no blog asset bundle was copied.
- Blog content is an archive: Flutter/SwiftUI examples date to 2022; the OpenAI/Anthropic comparison dates to December 2023 and contains outdated model/API claims. External demos and project websites were copied from source without checking ongoing availability. Neural-network config links `neural_network`, while its README links `dart_nn`; the latter is used for the project source link.
- `projectImages` and `portrait` are optional named exports in `data.ts` because the required shared types contain no image fields. Copied only the six project images (including two SVG identities) and the portrait into `public/images/`. No technology or employer logos were copied.

## Post provenance (source directory → slug; date proxy)

- `migrating-from-openai/README.md` → `migrating-from-openai`; 2023-12-07.
- `swift_vs_flutter-profile/README.md` → `swift-vs-flutter-profile`; 2022-12-20.
- `flutter-wizard/README.md` → `flutter-wizard`; 2022-10-26.
- `crosscheck-createTeam/README.md` → `crosscheck-createteam`; 2022-10-26.
- `dart_neuralNetwork/README.md` → `dart-neuralnetwork`; 2022-10-05.
- `unix-beginnersGuide/README.md` → `unix-beginnersguide`; 2022-08-23.
- `swiftui-loadingPlaceholder/README.md` → `swiftui-loadingplaceholder`; 2022-07-24.
- `swift_vs_flutter-LoginUI/README.md` → `swift-vs-flutter-loginui`; 2022-07-24.
- `flutter-sheetSelector/README.md` → `flutter-sheetselector`; 2022-07-24.
- `flutter-pullRefresh/README.md` → `flutter-pullrefresh`; 2022-07-24.
- `flutter-loginScreen/README.md` → `flutter-loginscreen`; 2022-07-24.
- `flutter-iOSMenu/README.md` → `flutter-iosmenu`; 2022-07-24.
- `swiftui-asyncImage/README.md` → `swiftui-asyncimage`; 2022-07-22.

No blocking questions. No changes made under `website/` or `repo_scraper/`.
