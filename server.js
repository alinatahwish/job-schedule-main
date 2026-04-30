import bisect
import json
import sys
from typing import Dict, List, Tuple


def validate_jobs(raw_jobs: List[Dict]) -> List[Dict]:
    jobs = []
    for idx, job in enumerate(raw_jobs):
        try:
            start = float(job["start"])
            end = float(job["end"])
            profit = float(job["profit"])
        except (KeyError, TypeError, ValueError):
            raise ValueError(f"Invalid job format at index {idx}.")

        if start >= end:
            raise ValueError(f"Invalid time range for job at index {idx}. start must be < end.")

        jobs.append(
            {
                "start": start,
                "end": end,
                "profit": profit,
                "originalIndex": idx,
            }
        )
    return jobs


def weighted_interval_dp(jobs: List[Dict]) -> Tuple[float, List[Dict], List[Dict]]:
    sorted_jobs = sorted(jobs, key=lambda j: j["end"])
    n = len(sorted_jobs)

    ends = [job["end"] for job in sorted_jobs]
    p = []
    for i in range(n):
        # Rightmost job ending <= current start
        idx = bisect.bisect_right(ends, sorted_jobs[i]["start"]) - 1
        p.append(idx)

    dp = [0.0] * n
    take = [False] * n

    for i in range(n):
        include_profit = sorted_jobs[i]["profit"] + (dp[p[i]] if p[i] >= 0 else 0.0)
        exclude_profit = dp[i - 1] if i > 0 else 0.0

        if include_profit >= exclude_profit:
            dp[i] = include_profit
            take[i] = True
        else:
            dp[i] = exclude_profit
            take[i] = False

    selected = []
    i = n - 1
    while i >= 0:
        include_profit = sorted_jobs[i]["profit"] + (dp[p[i]] if p[i] >= 0 else 0.0)
        exclude_profit = dp[i - 1] if i > 0 else 0.0
        if include_profit >= exclude_profit and take[i]:
            selected.append(sorted_jobs[i])
            i = p[i]
        else:
            i -= 1

    selected.reverse()

    dp_steps = []
    for i in range(n):
        dp_steps.append(
            {
                "index": i,
                "job": sorted_jobs[i],
                "lastNonConflictingIndex": p[i],
                "dpValue": dp[i],
            }
        )

    return dp[-1] if n else 0.0, selected, dp_steps


def greedy_schedule(jobs: List[Dict]) -> Tuple[float, List[Dict]]:
    sorted_jobs = sorted(jobs, key=lambda j: j["end"])
    selected = []
    current_end = -float("inf")
    total_profit = 0.0

    for job in sorted_jobs:
        if job["start"] >= current_end:
            selected.append(job)
            current_end = job["end"]
            total_profit += job["profit"]

    return total_profit, selected


def main() -> None:
    try:
        raw = sys.stdin.read()
        payload = json.loads(raw) if raw.strip() else {}
        algorithm = payload.get("algorithm", "dp")
        jobs = validate_jobs(payload.get("jobs", []))

        if not jobs:
            raise ValueError("No jobs provided.")

        if algorithm == "greedy":
            max_profit, selected = greedy_schedule(jobs)
            output = {
                "algorithm": "greedy",
                "maxProfit": max_profit,
                "selectedJobs": selected,
                "dpTable": [],
                "complexity": {"time": "O(n log n)", "space": "O(n)"},
            }
        else:
            max_profit, selected, dp_steps = weighted_interval_dp(jobs)
            output = {
                "algorithm": "dp",
                "maxProfit": max_profit,
                "selectedJobs": selected,
                "dpTable": dp_steps,
                "complexity": {"time": "O(n log n)", "space": "O(n)"},
            }

        print(json.dumps(output))
    except Exception as exc:
        error_output = {"error": str(exc)}
        print(json.dumps(error_output), file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
