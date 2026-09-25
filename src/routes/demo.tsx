import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft, BarChart3, Brain, Check, ClipboardCheck, Coins, FileClock,
  Flame, Megaphone, MessageSquareText, Play, ShieldCheck, Users, Zap,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Demo — TAG OPC" },
      { name: "description", content: "Trải nghiệm thử trụ sở điều hành AI của TAG OPC với dữ liệu mô phỏng: điều hành, marketing, bảng việc, nhân sự AI, bộ não, sổ sách." },
      { property: "og:title", content: "Demo — TAG OPC" },
      { property: "og:description", content: "Trải nghiệm thử trụ sở điều hành AI của TAG OPC với dữ liệu mô phỏng." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DemoPage,
});

type TabId = "dieu-hanh" | "marketing" | "bang-viec" | "viec-nhanh" | "nhan-su" | "bo-nao" | "so-sach" | "nhat-ky";

const tabs: { id: TabId; label: string; icon: typeof BarChart3 }[] = [
  { id: "dieu-hanh", label: "Điều hành", icon: BarChart3 },
  { id: "marketing", label: "Marketing", icon: Megaphone },
  { id: "bang-viec", label: "Bảng việc", icon: ClipboardCheck },
  { id: "viec-nhanh", label: "Việc nhanh", icon: MessageSquareText },
  { id: "nhan-su", label: "Nhân sự", icon: Users },
  { id: "bo-nao", label: "Bộ não", icon: Brain },
  { id: "so-sach", label: "Sổ sách", icon: Coins },
  { id: "nhat-ky", label: "Nhật ký", icon: FileClock },
];

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="rounded-md border border-border bg-secondary/60 p-5">{children}</div>;
}

function DieuHanh() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <Panel>
        <div className="text-[10px] uppercase text-muted-foreground">Mục tiêu quý</div>
        <div className="mt-2 font-display text-3xl font-bold">82% <span className="text-xs text-primary">+4.2%</span></div>
        <div className="mt-4 h-1 overflow-hidden rounded bg-command"><div className="h-full w-[82%] bg-primary" /></div>
      </Panel>
      <Panel>
        <div className="text-[10px] uppercase text-muted-foreground">Ngân sách AI tháng này</div>
        <div className="mt-2 font-display text-3xl font-bold">1,24tr <span className="text-xs text-muted-foreground">/ 2tr đ</span></div>
        <div className="mt-4 h-1 overflow-hidden rounded bg-command"><div className="h-full w-[62%] bg-flame" /></div>
      </Panel>
      <Panel>
        <div className="text-[10px] uppercase text-muted-foreground">Việc chờ Sếp duyệt</div>
        <div className="mt-2 font-display text-3xl font-bold text-flame">3 <span className="text-xs text-muted-foreground">đầu việc</span></div>
        <div className="mt-4 text-xs text-muted-foreground">Cũ nhất: 2 giờ trước</div>
      </Panel>
      <div className="rounded-md border border-primary/20 bg-primary/5 p-5 lg:col-span-3">
        <div className="flex items-center justify-between">
          <div className="font-display font-semibold text-primary">Việc đáng làm nhất lúc này</div>
          <span className="rounded bg-primary/15 px-2 py-1 text-[10px] font-bold text-primary">ƯU TIÊN 01</span>
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold">Viết bài giới thiệu dịch vụ mới của Sếp</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Phòng Marketing đã soạn 3 phiên bản theo đúng giọng thương hiệu. Sếp chỉ cần chọn, sửa hoặc duyệt.</p>
        <Button variant="signal" className="mt-5"><Check />Duyệt để xuất bản</Button>
      </div>
    </div>
  );
}

function Marketing() {
  const items = [
    ["Khai bộ não thương hiệu", "Đã nạp 12 tài liệu về công ty, sản phẩm và khách hàng mục tiêu.", "Hoàn tất"],
    ["Giọng thương hiệu", "Gần gũi, thẳng vấn đề, không hứa hão. Cấm dùng từ 'số 1'.", "Đang dùng"],
    ["Chiến dịch tháng 9", "8 bài blog + 20 bài social cho dịch vụ mới. AI đã soạn 60%.", "Đang chạy"],
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map(([title, text, status]) => (
        <Panel key={title}>
          <div className="flex items-center justify-between">
            <span className="font-display font-semibold">{title}</span>
            <span className={`rounded px-2 py-1 text-[10px] font-bold ${status === "Hoàn tất" ? "bg-primary/15 text-primary" : "bg-flame/15 text-flame"}`}>{status}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
        </Panel>
      ))}
    </div>
  );
}

function BangViec() {
  const cols: [string, string[]][] = [
    ["Chờ giao", ["Nghiên cứu đối thủ Q4", "Chuẩn bị slide giới thiệu"]],
    ["AI đang làm", ["Viết bài dịch vụ mới", "Phân tích phễu bán hàng", "Soạn email chăm sóc KH"]],
    ["Chờ Sếp duyệt", ["Bài blog #3", "Báo giá gói Pro"]],
  ];
  return (
    <div>
      <div className="mb-5 rounded-md border border-border bg-secondary/60 p-4 text-sm">
        <span className="font-display font-semibold text-primary">Sứ mệnh quý:</span>{" "}
        <span className="text-muted-foreground">Ra mắt dịch vụ mới và đạt 50 khách hàng đầu tiên.</span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {cols.map(([col, cards]) => (
          <div key={col} className="rounded-md border border-border bg-secondary/40 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-muted-foreground">{col}</span>
              <span className="rounded bg-command px-2 py-0.5 font-mono text-[10px]">{cards.length}</span>
            </div>
            <div className="space-y-2">
              {cards.map((c) => <div key={c} className="rounded border border-border bg-card p-3 text-sm">{c}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ViecNhanh() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
      <Panel>
        <div className="font-display font-semibold">Giao việc nhanh cho cả đội</div>
        <div className="mt-4 rounded border border-border bg-background p-4 text-sm text-muted-foreground">
          "Tóm tắt 5 bài viết mới nhất của đối thủ A và đề xuất 3 góc nội dung để mình làm khác họ."
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Nghiên cứu", "Nội dung", "Phân tích", "Kiểm định"].map((r) => (
            <span key={r} className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">{r}</span>
          ))}
        </div>
        <Button variant="flame" className="mt-5"><Zap />Giao việc</Button>
      </Panel>
      <Panel>
        <div className="font-display font-semibold">Mẫu việc hay dùng</div>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {["Tóm tắt & đề xuất", "Soạn bài theo giọng thương hiệu", "Kiểm tra lại một quyết định", "Họp sáng / họp tối"].map((m) => (
            <li key={m} className="flex items-center gap-2 rounded border border-border bg-card px-3 py-2"><Play className="size-3 text-flame" />{m}</li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

function NhanSu() {
  const roles = [
    ["Sếp", "Ra quyết định, duyệt kết quả", true],
    ["Giám đốc vận hành AI", "Phân việc, giám sát tiến độ, báo cáo Sếp", false],
    ["AI Nghiên cứu", "Thu thập và tổng hợp thông tin", false],
    ["AI Nội dung", "Viết theo giọng thương hiệu", false],
    ["AI Phân tích", "Đọc số liệu, tìm điểm bất thường", false],
    ["AI Kiểm định", "Soi lỗi trước khi trình Sếp", false],
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {roles.map(([name, desc, boss]) => (
        <Panel key={String(name)}>
          <div className="flex items-center gap-3">
            <span className={`grid size-10 place-items-center rounded ${boss ? "bg-flame/15 text-flame" : "bg-primary/15 text-primary"}`}><Users className="size-5" /></span>
            <div className="font-display font-semibold">{name}</div>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{desc}</p>
        </Panel>
      ))}
    </div>
  );
}

function BoNao() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[
        ["Não CEO", "Cách Sếp ra quyết định, ưu tiên và những điều Sếp không bao giờ làm.", "24 ghi nhớ"],
        ["Não doanh nghiệp", "Sản phẩm, khách hàng, đối thủ và lịch sử các chiến dịch.", "38 ghi nhớ"],
        ["Giọng thương hiệu", "Từ ngữ được dùng, từ ngữ bị cấm, ví dụ bài viết chuẩn.", "15 ghi nhớ"],
        ["Sổ tay bài học", "Những lần làm hỏng và cách cả đội rút kinh nghiệm.", "9 bài học"],
      ].map(([title, text, count]) => (
        <Panel key={title}>
          <div className="flex items-center justify-between">
            <span className="font-display font-semibold">{title}</span>
            <span className="font-mono text-[10px] uppercase text-primary">{count}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
        </Panel>
      ))}
    </div>
  );
}

function SoSach() {
  const rows = [
    ["12/09", "Thu — Khách hàng gói Pro", "+399.000đ", "text-primary"],
    ["11/09", "Chi — Ngân sách AI", "-86.000đ", "text-flame"],
    ["10/09", "Thu — Tư vấn 1:1", "+1.500.000đ", "text-primary"],
    ["09/09", "Chi — Công cụ thiết kế", "-230.000đ", "text-flame"],
  ];
  return (
    <div className="grid gap-5 lg:grid-cols-[.7fr_1.3fr]">
      <div className="space-y-4">
        <Panel><div className="text-[10px] uppercase text-muted-foreground">Thu tháng này</div><div className="mt-2 font-display text-2xl font-bold text-primary">4.290.000đ</div></Panel>
        <Panel><div className="text-[10px] uppercase text-muted-foreground">Chi tháng này</div><div className="mt-2 font-display text-2xl font-bold text-flame">1.180.000đ</div></Panel>
      </div>
      <Panel>
        <div className="font-display font-semibold">Sổ thu chi</div>
        <div className="mt-4 divide-y divide-border">
          {rows.map(([date, label, amount, cls]) => (
            <div key={label} className="flex items-center justify-between py-3 text-sm">
              <span className="w-16 font-mono text-xs text-muted-foreground">{date}</span>
              <span className="flex-1">{label}</span>
              <span className={`font-mono font-semibold ${cls}`}>{amount}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function NhatKy() {
  const logs = [
    ["15:02", "AI Nội dung", "Hoàn thành bài blog #3, chuyển chờ Sếp duyệt."],
    ["14:20", "Giám đốc vận hành", "Giao việc 'Phân tích phễu bán hàng' cho AI Phân tích."],
    ["11:45", "Sếp", "Duyệt báo giá gói Pro và gửi cho khách hàng."],
    ["09:10", "AI Kiểm định", "Phát hiện 2 lỗi số liệu trong báo cáo tuần, đã sửa."],
  ];
  return (
    <Panel>
      <div className="font-display font-semibold">Nhật ký hoạt động hôm nay</div>
      <div className="mt-4 space-y-4">
        {logs.map(([time, who, what]) => (
          <div key={time} className="flex gap-4 text-sm">
            <span className="w-12 shrink-0 font-mono text-xs text-primary">{time}</span>
            <div><span className="font-semibold">{who}</span> <span className="text-muted-foreground">— {what}</span></div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

const panels: Record<TabId, () => React.ReactNode> = {
  "dieu-hanh": DieuHanh,
  "marketing": Marketing,
  "bang-viec": BangViec,
  "viec-nhanh": ViecNhanh,
  "nhan-su": NhanSu,
  "bo-nao": BoNao,
  "so-sach": SoSach,
  "nhat-ky": NhatKy,
};

function DemoPage() {
  const [tab, setTab] = useState<TabId>("dieu-hanh");
  const ActivePanel = panels[tab];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="Về trang chủ TAG OPC">
            <span className="grid size-9 place-items-center rounded-sm bg-flame font-display text-lg font-bold text-flame-foreground">T</span>
            <span className="font-display text-xl font-bold">TAG OPC</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link to="/"><ArrowLeft />Trang chủ</Link></Button>
            <Button asChild variant="flame"><Link to="/signup"><Flame />Mở bản LIVE</Link></Button>
          </div>
        </div>
      </nav>

      <section className="px-5 pb-24 pt-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase text-primary">Bản demo · dữ liệu mô phỏng</p>
              <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Trụ sở điều hành của bạn</h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="signal-pulse size-2 rounded-full bg-primary" /> Hệ thống đang vận hành
            </div>
          </div>

          <div className="shadow-console overflow-hidden rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border bg-secondary/70 px-4 py-3">
              <div className="flex items-center gap-2"><i className="size-2.5 rounded-full bg-flame" /><i className="size-2.5 rounded-full bg-primary" /><i className="size-2.5 rounded-full bg-muted-foreground/30" /></div>
              <span className="font-mono text-[10px] uppercase text-muted-foreground">TAG_HQ // DEMO</span>
            </div>
            <div className="flex gap-1 overflow-x-auto border-b border-border px-3 py-2">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`flex shrink-0 items-center gap-2 rounded px-3 py-2 text-xs font-semibold transition-colors ${tab === id ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
                >
                  <Icon className="size-3.5" />{label}
                </button>
              ))}
            </div>
            <div className="p-5 lg:p-7"><ActivePanel /></div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 rounded-lg border border-flame/30 bg-flame/5 p-8 text-center">
            <ShieldCheck className="size-8 text-flame" />
            <h2 className="font-display text-2xl font-bold">Thấy đúng cách mình muốn làm việc?</h2>
            <p className="max-w-xl text-sm text-muted-foreground">Mở bản LIVE để dùng với khóa AI và dữ liệu riêng của bạn. Mọi kết quả quan trọng vẫn chờ bạn duyệt.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="flame" size="lg"><Link to="/signup"><Flame />Mở bản LIVE — 399.000đ/năm</Link></Button>
              <Button asChild variant="command" size="lg"><Link to="/">Về trang chủ</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
