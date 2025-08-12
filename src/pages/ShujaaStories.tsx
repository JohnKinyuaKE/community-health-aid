import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

 type Story = { id: string; text: string; likes: number; hearts: number; comments: string[] };

export default function ShujaaStories() {
  const [stories, setStories] = useState<Story[]>([
    { id: "1", text: "I completed my screening last month. It was quick and reassuring. Please go for yours!", likes: 3, hearts: 5, comments: ["Asante!", "Nimehamasika"] },
  ]);
  const [draft, setDraft] = useState("");

  useEffect(() => { document.title = "ShujaaStories – Survivors & Support"; }, []);

  const post = () => {
    if (!draft.trim()) return;
    setStories((s) => [{ id: Date.now().toString(), text: draft.trim(), likes: 0, hearts: 0, comments: [] }, ...s]);
    setDraft("");
  };

  const react = (id: string, type: "likes" | "hearts") =>
    setStories((s) => s.map((st) => (st.id === id ? { ...st, [type]: st[type] + 1 } : st)));

  const addComment = (id: string, comment: string) =>
    setStories((s) => s.map((st) => (st.id === id ? { ...st, comments: [comment, ...st.comments] } : st)));

  return (
    <div className="container py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">ShujaaStories</h1>
        <p className="text-muted-foreground">Share or read anonymous stories. Be kind and supportive.</p>
      </header>

      <Card className="max-w-2xl mx-auto mb-8 shadow-elevated">
        <CardHeader>
          <CardTitle>Post your story</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={4}
            className="w-full rounded-md border bg-background p-3"
            placeholder="Your experience, encouragement, or tips..."
          />
          <div className="mt-3 flex justify-end">
            <Button variant="hero" onClick={post}>Post anonymously</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4 max-w-2xl mx-auto">
        {stories.map((s) => (
          <Card key={s.id} className="shadow-elevated">
            <CardContent className="pt-6">
              <p className="mb-3 leading-relaxed">{s.text}</p>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={() => react(s.id, "likes")}>👍 {s.likes}</Button>
                <Button variant="outline" size="sm" onClick={() => react(s.id, "hearts")}>❤️ {s.hearts}</Button>
              </div>
              <div className="mt-4 space-y-2">
                <div className="text-sm font-medium">Comments</div>
                <div className="space-y-2">
                  <CommentBox onSubmit={(text) => addComment(s.id, text)} />
                  {s.comments.map((c, i) => (
                    <div key={i} className="rounded-md border p-2 text-sm">{c}</div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CommentBox({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = useState("");
  const submit = () => { if (text.trim()) { onSubmit(text.trim()); setText(""); } };
  return (
    <div className="flex items-center gap-2">
      <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a comment..." />
      <Button variant="ghost" onClick={submit}>Send</Button>
    </div>
  );
}
