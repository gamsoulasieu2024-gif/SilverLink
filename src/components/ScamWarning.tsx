interface ScamWarningProps {
  type: "scam" | "link";
}

const ScamWarning = ({ type }: ScamWarningProps) => {
  if (type === "scam") {
    return (
      <div className="mb-4 rounded-xl border-2 border-destructive bg-destructive/10 p-4">
        <p className="text-lg font-bold text-foreground">
          🚨 Warning: This message may be a scam. Do not send money or personal information. Contact a family member before responding.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-4 rounded-xl border-2 border-warning bg-warning/20 p-4">
      <p className="text-lg font-bold text-foreground">
        ⚠️ This reply contains a link. Only click links from people you trust.
      </p>
    </div>
  );
};

export default ScamWarning;
