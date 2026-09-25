import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, BarChart3, Brain, Check, ClipboardCheck, Clock3, Coins,
  FileClock, Flame, Megaphone, Menu, MessageSquareText, Network, Play,
  ShieldCheck, Sparkles, Users, X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TAG OPC — Hệ điều hành AI cho chủ doanh nghiệp" },
      { name: "description", content: "Điều hành, marketing, giao việc và quản lý đội ngũ AI trong một trung tâm chỉ huy duy nhất." },
      { property: "og:title", content: "TAG OPC — Vận hành công ty bằng đội ngũ AI" },
      { property: "og:description", content: "Một trung tâm chỉ huy cho điều hành, marketing, công việc, nhân sự AI, bộ não và sổ sách." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const modules = [
  { icon: BarChart3, title: "Điều hành", text: "Bàn làm việc của Sếp: mục tiêu, việc chờ duyệt, nhịp vận hành và ngân sách AI." },
  { icon: Megaphone, title: "Phòng Marketing", text: "Khai bộ não thương hiệu một lần, AI viết đúng giọng và bám sát điều Sếp duyệt." },
  { icon: ClipboardCheck, title: "Bảng việc", text: "Từ sứ mệnh đến mục tiêu quý, giao việc cho AI làm và Sếp duyệt kết quả." },
  { icon: MessageSquareText, title: "Việc nhanh", text: "Cả đội xúm vào một việc, phối hợp nghiên cứu, nội dung, phân tích và kiểm định." },
  { icon: Users, title: "Nhân sự AI", text: "Sơ đồ tổ chức có Giám đốc vận hành và từng vai trò AI với nhiệm vụ rõ ràng." },
  { icon: Brain, title: "Bộ não", text: "Lưu não CEO, não doanh nghiệp, giọng thương hiệu và những bài học của đội." },
  { icon: Coins, title: "Sổ sách & Nhật ký", text: "Ghi thu chi, khách hàng, lời hứa và mọi quyết định thành một lịch sử bất biến." },
];

const faqs = [
  ["TAG OPC phù hợp với ai?", "Chủ doanh nghiệp một người, freelancer, chuyên gia và đội nhỏ muốn dùng AI như một đội ngũ có tổ chức thay vì các công cụ rời rạc."],
  ["Tôi có cần biết kỹ thuật không?", "Không. Bạn bắt đầu bằng việc trả lời các câu hỏi về công ty, giọng thương hiệu và cách ra quyết định; hệ thống hướng dẫn từng bước."],
  ["Chi phí AI được tính thế nào?", "TAG OPC cho phép bạn dùng khóa AI riêng và theo dõi chi phí ngay trong trụ sở. Bạn kiểm soát model, hạn mức và dữ liệu của mình."],
  ["Dữ liệu công ty có bị mất không?", "Bộ não, sổ tay và dữ liệu làm việc được tổ chức để bạn chủ động sao lưu và mang theo khi cần."],
];

const surveyQuestions = [
  { id: "field", label: "Bạn đang kinh doanh lĩnh vực gì?", placeholder: "Ví dụ: F&B, giáo dục, bất động sản, dịch vụ..." },
  { id: "audience", label: "Đối tượng khách hàng của bạn là ai?", placeholder: "Ví dụ: chủ shop online từ 25–40 tuổi..." },
  { id: "product", label: "Sản phẩm cốt lõi của bạn là gì?", placeholder: "Ví dụ: phần mềm quản lý bán hàng..." },
];

function SurveyModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    try {
      if (!window.sessionStorage.getItem("tag-opc-survey-done")) {
        timer = window.setTimeout(() => setOpen(true), 1000);
      }
    } catch {
      timer = window.setTimeout(() => setOpen(true), 1000);
    }
    return () => { if (timer) window.clearTimeout(timer); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const closeSurvey = () => {
    setOpen(false);
    try { window.sessionStorage.setItem("tag-opc-survey-done", "1"); } catch { /* private mode */ }
  };

  const submitStep = () => {
    const value = draft.trim();
    if (!value) { setError("Vui lòng điền câu trả lời trước khi tiếp tục."); return; }
    setError("");
    const next = { ...answers, [surveyQuestions[step].id]: value.slice(0, 300) };
    setAnswers(next);
    setDraft("");
    if (step < surveyQuestions.length - 1) {
      setStep(step + 1);
    } else {
      try { window.localStorage.setItem("tag-opc-survey", JSON.stringify(next)); } catch { /* private mode */ }
      setDone(true);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-background/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Khảo sát khách hàng">
      <div className="shadow-console relative w-full max-w-lg rounded-lg border border-border bg-card p-7 sm:p-9">
        <button onClick={closeSurvey} aria-label="Đóng khảo sát" className="absolute right-4 top-4 grid size-8 place-items-center rounded text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"><X /></button>

        {done ? (
          <div className="py-4 text-center">
            <span className="signal-pulse mx-auto mb-5 grid size-12 place-items-center rounded-full bg-primary/15 text-primary"><Check className="size-6" /></span>
            <h2 className="font-display text-2xl font-bold">Cảm ơn bạn!</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Câu trả lời của bạn đã được ghi nhận. TAG OPC sẽ dùng chúng để thiết lập trụ sở AI đúng với doanh nghiệp của bạn.</p>
            <Button variant="flame" className="mt-7 w-full" onClick={closeSurvey}>Khám phá TAG OPC <ArrowRight /></Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">Khảo sát nhanh · 0{step + 1}/03</span>
              <div className="flex gap-1.5">
                {surveyQuestions.map((_, i) => <span key={i} className={`h-1 w-8 rounded-full ${i < step ? "bg-primary" : i === step ? "bg-flame" : "bg-muted"}`} />)}
              </div>
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold leading-snug">{surveyQuestions[step].label}</h2>
            <label className="sr-only" htmlFor="survey-input">{surveyQuestions[step].label}</label>
            <input
              id="survey-input"
              autoFocus
              value={draft}
              maxLength={300}
              placeholder={surveyQuestions[step].placeholder}
              onChange={(e) => { setDraft(e.target.value); setError(""); }}
              onKeyDown={(e) => { if (e.key === "Enter") submitStep(); }}
              className={`mt-6 w-full rounded-md border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-flame ${error ? "border-flame" : "border-border"}`}
            />
            {error && <p className="mt-2 text-xs text-flame">{error}</p>}
            <div className="mt-6 flex items-center justify-between gap-3">
              <button onClick={closeSurvey} className="text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline">Bỏ qua khảo sát</button>
              <Button variant="flame" onClick={submitStep}>{step === surveyQuestions.length - 1 ? "Hoàn tất" : "Tiếp tục"} <ArrowRight /></Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="TAG OPC - đầu trang">
            <span className="grid size-9 place-items-center rounded-sm bg-flame font-display text-lg font-bold text-flame-foreground">T</span>
            <span className="font-display text-xl font-bold">TAG OPC</span>
          </a>
          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a className="transition-colors hover:text-primary" href="#features">Phân hệ</a>
            <a className="transition-colors hover:text-primary" href="#process">Cách vận hành</a>
            <a className="transition-colors hover:text-primary" href="#pricing">Bảng giá</a>
            <a className="transition-colors hover:text-primary" href="#faq">FAQ</a>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Button asChild variant="command"><a href="#demo"><Play />Xem demo</a></Button>
            <Button asChild variant="flame"><a href="#pricing">Mở bản LIVE</a></Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Mở menu">
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && <div className="grid gap-1 border-t border-border px-5 py-4 md:hidden">
          {[["Phân hệ", "#features"], ["Cách vận hành", "#process"], ["Bảng giá", "#pricing"], ["FAQ", "#faq"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="py-3 text-sm text-muted-foreground">{label}</a>)}
        </div>}
      </nav>

      <section id="top" className="command-grid relative px-5 pb-24 pt-20 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase text-primary">
            <span className="signal-pulse size-2 rounded-full bg-primary" /> Hệ điều hành AI cho chủ doanh nghiệp
          </div>
          <h1 className="mx-auto max-w-5xl font-display text-5xl font-bold leading-[1.03] sm:text-6xl lg:text-7xl">
            Vận hành công ty bằng <span className="text-primary">đội ngũ AI</span> tinh nhuệ
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            Một trụ sở duy nhất để đặt mục tiêu, giao việc, duyệt kết quả và lưu lại cách công ty bạn vận hành.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="flame" className="h-12 px-7 text-base"><a href="#pricing">Dùng thử 10 việc đầu <ArrowRight /></a></Button>
            <Button asChild size="lg" variant="command" className="h-12 px-7 text-base"><a href="#demo"><Play /> Xem một ngày điều hành</a></Button>
          </div>

          <div id="demo" className="shadow-console mx-auto mt-16 max-w-5xl overflow-hidden rounded-lg border border-border bg-card text-left">
            <div className="flex items-center justify-between border-b border-border bg-secondary/70 px-4 py-3">
              <div className="flex items-center gap-2"><i className="size-2.5 rounded-full bg-flame"/><i className="size-2.5 rounded-full bg-primary"/><i className="size-2.5 rounded-full bg-muted-foreground/30"/></div>
              <span className="font-mono text-[10px] uppercase text-muted-foreground">TAG_HQ // HỆ THỐNG ĐANG VẬN HÀNH</span>
            </div>
            <div className="grid gap-5 p-5 lg:grid-cols-[.72fr_1.6fr] lg:p-7">
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                <div className="rounded-md border border-border bg-secondary/60 p-4">
                  <div className="text-[10px] uppercase text-muted-foreground">Mục tiêu quý</div>
                  <div className="mt-2 font-display text-3xl font-bold">82% <span className="text-xs text-primary">+4.2%</span></div>
                  <div className="mt-4 h-1 overflow-hidden rounded bg-command"><div className="h-full w-[82%] bg-primary" /></div>
                </div>
                <div className="rounded-md border border-border bg-secondary/60 p-4">
                  <div className="text-[10px] uppercase text-muted-foreground">Nhân sự AI</div>
                  <div className="mt-2 font-display text-3xl font-bold text-flame">5 <span className="text-xs text-muted-foreground">đang sẵn sàng</span></div>
                  <div className="mt-4 flex -space-x-2">{[Brain, Megaphone, BarChart3, ShieldCheck].map((Icon, i) => <span key={i} className="grid size-8 place-items-center rounded-full border border-background bg-card text-primary"><Icon className="size-3.5" /></span>)}</div>
                </div>
              </div>
              <div className="rounded-md border border-primary/20 bg-primary/5 p-5 lg:p-6">
                <div className="flex justify-between gap-4">
                  <div><div className="font-display font-semibold text-primary">Việc đáng làm nhất lúc này</div><p className="mt-1 text-xs text-muted-foreground">AI đã phân tích 48 đầu việc</p></div>
                  <span className="h-fit rounded bg-primary/15 px-2 py-1 text-[10px] font-bold text-primary">ƯU TIÊN 01</span>
                </div>
                <h2 className="mt-7 font-display text-xl font-semibold">Viết bài giới thiệu dịch vụ mới của Sếp</h2>
                <div className="mt-4 rounded border border-border bg-background p-4 text-sm leading-6 text-muted-foreground">Phòng Marketing đã soạn 3 phiên bản theo đúng giọng thương hiệu. Sếp chỉ cần chọn, sửa hoặc duyệt.</div>
                <Button variant="signal" className="mt-5 w-full"><Check />Duyệt để xuất bản</Button>
              </div>
            </div>
            <div className="grid grid-cols-4 border-t border-border text-center text-[10px] uppercase text-muted-foreground sm:grid-cols-8">
              {["Điều hành", "Marketing", "Bảng việc", "Việc nhanh", "Nhân sự", "Bộ não", "Sổ sách", "Nhật ký"].map((item, i) => <div key={item} className={`border-r border-border px-2 py-3 ${i === 0 ? "bg-primary/10 text-primary" : ""}`}>{item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-foreground px-5 py-20 text-background lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div><p className="text-xs font-bold uppercase text-flame">Không thêm người để quản</p><h2 className="mt-4 font-display text-4xl font-bold">Từ công cụ rời rạc đến một hệ thống biết phối hợp.</h2></div>
          <div className="grid gap-px bg-background/15 sm:grid-cols-2">
            <div className="bg-foreground p-7"><X className="text-flame"/><h3 className="mt-5 font-display text-xl font-bold">Trước TAG OPC</h3><p className="mt-3 text-sm leading-6 text-background/65">Mỗi công cụ một nơi. Prompt làm lại từ đầu. Sếp tự nối mọi việc và không biết AI đang tốn bao nhiêu.</p></div>
            <div className="bg-foreground p-7"><Check className="text-primary"/><h3 className="mt-5 font-display text-xl font-bold">Sau TAG OPC</h3><p className="mt-3 text-sm leading-6 text-background/65">AI có vai trò, có bộ não, có bảng việc. Mọi kết quả chờ Sếp duyệt và mọi quyết định đều được ghi lại.</p></div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-foreground px-5 pb-24 text-background lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl"><p className="text-xs font-bold uppercase text-primary">Một trụ sở · bảy phân hệ</p><h2 className="mt-4 font-display text-4xl font-bold">Mọi thứ công ty cần để chạy gọn.</h2></div>
          <div className="grid gap-px bg-background/15 border border-background/15 md:grid-cols-2 lg:grid-cols-4">
            {modules.map(({icon: Icon, title, text}, i) => <article key={title} className={`bg-foreground p-7 transition-colors hover:bg-primary/5 ${i === 6 ? "lg:col-span-2" : ""}`}>
              <div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded bg-background text-primary"><Icon className="size-5" /></span><span className="font-mono text-xs text-background/35">0{i+1}</span></div>
              <h3 className="mt-6 font-display text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-background/65">{text}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section id="process" className="command-grid px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl"><div className="text-center"><p className="text-xs font-bold uppercase text-primary">Quy trình bật công tắc</p><h2 className="mt-4 font-display text-4xl font-bold">Nói như Sếp. Làm như một đội.</h2></div>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {[
              [Brain, "01", "Nạp bộ não", "Trả lời câu hỏi về công ty, cách Sếp quyết và giọng thương hiệu."],
              [Network, "02", "Giao vai cho AI", "Giám đốc vận hành phân việc cho nghiên cứu, nội dung, phân tích và kiểm định."],
              [ClipboardCheck, "03", "Duyệt & ghi nhớ", "Sếp duyệt kết quả. Bài học được lưu để lần sau cả đội làm tốt hơn."],
            ].map(([Icon, n, title, text]) => { const I = Icon as typeof Brain; return <div key={String(n)} className="border-t border-border pt-6"><div className="flex items-center justify-between"><I className="text-primary"/><span className="font-display text-4xl font-bold text-primary/25">{String(n)}</span></div><h3 className="mt-8 font-display text-xl font-bold">{String(title)}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{String(text)}</p></div>})}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {[ [Clock3, "10 việc", "đầu tiên để thử mô phỏng"], [Users, "5 vai trò AI", "phối hợp trong một trụ sở"], [ShieldCheck, "Sếp duyệt", "trước mọi kết quả quan trọng"] ].map(([Icon, stat, label]) => { const I = Icon as typeof Clock3; return <div key={String(stat)} className="flex items-center gap-5"><I className="size-8 text-flame"/><div><div className="font-display text-3xl font-bold">{String(stat)}</div><div className="text-sm text-muted-foreground">{String(label)}</div></div></div>})}
        </div>
      </section>

      <section id="pricing" className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl"><div className="text-center"><p className="text-xs font-bold uppercase text-primary">Chọn cách bắt đầu</p><h2 className="mt-4 font-display text-4xl font-bold">Mở trụ sở AI của riêng bạn.</h2></div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="border border-border bg-card p-8"><h3 className="font-display text-xl font-bold">Bản Demo</h3><p className="mt-2 text-sm text-muted-foreground">Thử toàn bộ giao diện với dữ liệu mô phỏng.</p><div className="my-8 font-display text-4xl font-bold">0đ</div><ul className="space-y-3 text-sm text-muted-foreground">{["10 việc đầu miễn phí", "Không cần cài khóa AI", "Xem đủ các phân hệ"].map(x => <li key={x} className="flex gap-3"><Check className="size-4 text-primary"/>{x}</li>)}</ul><Button asChild variant="command" className="mt-9 w-full"><a href="#demo">Xem demo</a></Button></div>
            <div className="relative border-2 border-flame bg-card p-8"><div className="absolute -top-3 left-8 bg-flame px-3 py-1 text-[10px] font-bold uppercase text-flame-foreground">Mở bản LIVE</div><h3 className="font-display text-xl font-bold text-flame">TAG OPC Pro</h3><p className="mt-2 text-sm text-muted-foreground">Dùng thật với khóa AI và dữ liệu riêng của bạn.</p><div className="my-8 font-display text-4xl font-bold">399.000đ <span className="text-base font-normal text-muted-foreground">/ năm</span></div><ul className="space-y-3 text-sm text-muted-foreground">{["Đầy đủ trụ sở điều hành", "Bộ não và sổ tay riêng", "Đội ngũ AI phối hợp", "Sao lưu dữ liệu chủ động"].map(x => <li key={x} className="flex gap-3"><Check className="size-4 text-primary"/>{x}</li>)}</ul><Button variant="flame" className="mt-9 h-11 w-full"><Flame />Mở bản LIVE</Button></div>
          </div>
          <p className="mt-5 text-center text-xs text-muted-foreground">Chi phí AI theo khóa riêng của bạn và không nằm trong phí TAG OPC.</p>
        </div>
      </section>

      <section id="faq" className="bg-foreground px-5 py-24 text-background lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[.65fr_1.35fr]"><div><p className="text-xs font-bold uppercase text-flame">Cần biết trước khi mở</p><h2 className="mt-4 font-display text-4xl font-bold">Câu hỏi thường gặp.</h2></div><div className="divide-y divide-background/15 border-y border-background/15">{faqs.map(([q,a]) => <details key={q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold">{q}<Sparkles className="size-4 text-primary transition-transform group-open:rotate-45"/></summary><p className="pt-4 text-sm leading-6 text-background/65">{a}</p></details>)}</div></div>
      </section>

      <footer className="border-t border-border px-5 py-16 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-12 md:flex-row md:items-end"><div className="max-w-xl"><div className="font-display text-3xl font-bold">Sẵn sàng để công ty tự vận hành gọn hơn?</div><p className="mt-4 text-muted-foreground">Bắt đầu bằng 10 việc mô phỏng. Chỉ mở bản LIVE khi bạn thấy đúng cách mình muốn làm việc.</p><div className="mt-7 flex gap-3"><Button asChild variant="flame"><a href="#pricing">Bắt đầu ngay <ArrowRight/></a></Button><Button asChild variant="command"><a href="#demo"><Play/>Xem demo</a></Button></div></div><div className="text-sm text-muted-foreground"><div className="font-display text-lg font-bold text-foreground">TAG OPC</div><p className="mt-2">Hệ điều hành AI cho công ty tinh gọn.</p></div></div><div className="mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row"><span>© 2026 TAG OPC</span><span className="font-mono uppercase text-primary">Command center: online</span></div></footer>
      <SurveyModal />
    </main>
  );
}
