import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Check, Flame, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Mở bản LIVE — TAG OPC" },
      { name: "description", content: "Đăng ký TAG OPC Pro để vận hành công ty bằng đội ngũ AI với khóa AI và dữ liệu riêng của bạn." },
      { property: "og:title", content: "Mở bản LIVE — TAG OPC" },
      { property: "og:description", content: "Đăng ký TAG OPC Pro để vận hành công ty bằng đội ngũ AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignupPage,
});

const benefits = [
  "Đầy đủ trụ sở điều hành: 8 phân hệ",
  "Bộ não và sổ tay riêng của công ty bạn",
  "Đội ngũ AI phối hợp theo vai trò rõ ràng",
  "Sếp duyệt trước mọi kết quả quan trọng",
  "Sao lưu và mang dữ liệu đi bất cứ lúc nào",
];

function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.company.trim()) {
      setError("Vui lòng điền đầy đủ thông tin trước khi tiếp tục.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Email chưa đúng định dạng. Vui lòng kiểm tra lại.");
      return;
    }
    setError("");
    try { window.localStorage.setItem("tag-opc-signup", JSON.stringify({ ...form, at: new Date().toISOString() })); } catch { /* private mode */ }
    setDone(true);
  };

  const field = (id: keyof typeof form, label: string, placeholder: string, type = "text") => (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase text-muted-foreground">{label}</label>
      <input
        id={id}
        type={type}
        value={form[id]}
        placeholder={placeholder}
        onChange={(e) => { setForm({ ...form, [id]: e.target.value }); setError(""); }}
        className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-flame"
      />
    </div>
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="Về trang chủ TAG OPC">
            <span className="grid size-9 place-items-center rounded-sm bg-flame font-display text-lg font-bold text-flame-foreground">T</span>
            <span className="font-display text-xl font-bold">TAG OPC</span>
          </Link>
          <Button asChild variant="ghost"><Link to="/"><ArrowLeft />Trang chủ</Link></Button>
        </div>
      </nav>

      <section className="command-grid px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase text-flame">Mở bản LIVE</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">TAG OPC Pro</h1>
            <div className="mt-5 font-display text-4xl font-bold">399.000đ <span className="text-base font-normal text-muted-foreground">/ năm</span></div>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">Dùng thật với khóa AI và dữ liệu riêng của bạn. Chi phí AI theo khóa riêng, không nằm trong phí TAG OPC.</p>
            <ul className="mt-8 space-y-3 text-sm">
              {benefits.map((b) => <li key={b} className="flex items-start gap-3"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{b}</li>)}
            </ul>
            <div className="mt-8 flex items-center gap-3 rounded-md border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
              <ShieldCheck className="size-5 shrink-0 text-primary" />
              Dữ liệu công ty nằm trong trụ sở của bạn, chủ động sao lưu và mang theo khi cần.
            </div>
          </div>

          <div className="shadow-console rounded-lg border border-border bg-card p-7 sm:p-9">
            {done ? (
              <div className="py-6 text-center">
                <span className="signal-pulse mx-auto mb-5 grid size-12 place-items-center rounded-full bg-primary/15 text-primary"><Check className="size-6" /></span>
                <h2 className="font-display text-2xl font-bold">Đã ghi nhận đăng ký!</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">Chúng tôi sẽ liên hệ qua email <span className="font-semibold text-foreground">{form.email}</span> để kích hoạt trụ sở AI cho <span className="font-semibold text-foreground">{form.company}</span>.</p>
                <Button asChild variant="flame" className="mt-7 w-full"><Link to="/demo">Trong lúc chờ, xem lại demo</Link></Button>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold">Đăng ký mở bản LIVE</h2>
                <p className="mt-2 text-sm text-muted-foreground">Điền thông tin để chúng tôi thiết lập trụ sở AI cho công ty bạn.</p>
                <div className="mt-7 space-y-5">
                  {field("name", "Họ và tên", "Ví dụ: Nguyễn Văn A")}
                  {field("email", "Email", "ban@congty.vn", "email")}
                  {field("company", "Tên công ty / thương hiệu", "Ví dụ: TAG Studio")}
                </div>
                {error && <p className="mt-3 text-xs text-flame">{error}</p>}
                <Button variant="flame" size="lg" className="mt-7 h-12 w-full text-base" onClick={submit}>
                  <Flame />Mở bản LIVE — 399.000đ/năm
                </Button>
                <p className="mt-4 text-center text-xs text-muted-foreground">Chưa chắc chắn? <Link to="/demo" className="text-primary underline-offset-4 hover:underline">Thử bản demo miễn phí</Link> trước.</p>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
